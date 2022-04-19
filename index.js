const fs = require('fs')
const path = require('path')
const syntaxerror = require('syntax-error')
const qrcode = require('qrcode-terminal')
const {
    Client,
    LocalAuth
} = require('whatsapp-web.js');
const {
    owner
} = require('./lib/config');
const toms = require('ms')
const databes = JSON.parse(fs.readFileSync('./lib/json/data.json'))
const client = new Client({
    authStrategy: new LocalAuth(),
    clientId: 'multidevice',
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--shm-size=2gb',
            '--disable-gpu',
            '--aggressive-cache-discard',
            '--disable-cache',
            '--disable-application-cache',
            '--disable-offline-load-stale-cache',
            '--disk-cache-size=0'
        ],
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
    }
});
client.initialize().then(async re => {
    await require('./lib/interval')(client)
})
client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    qrcode.generate(qr, {
        small: true
    }, function(qrcode) {
        console.log(qrcode)
    });
    console.log('Scan Qr Code');
});
client.on('ready', async () => {
    require('./lib/database/database').connectToDatabase()
    console.log('Client is ready!');
    client.sendMessage(owner, JSON.stringify(client.info, null, 2))
    databes.restarttime = Date.now() + await toms('4h')
    databes.cleartime = Date.now() + await toms('5s')
    fs.writeFileSync('./lib/json/data.json', JSON.stringify(databes))
});
//read command
let pluginFolder = path.join(__dirname, 'commands')
let pluginFilter = (filename) => /\.js$/.test(filename)
global.commands = {}
global.functions = {}
for (let filename of fs.readdirSync(pluginFolder).filter(pluginFilter)) {
    try {
        plugins = require(path.join(pluginFolder, filename))
        //console.log(plugins)
        if(plugins.function) global.functions[filename] = plugins
        else global.commands[filename] = plugins
    } catch (e) {
        console.log(e)
    }
}
global.reload = (_event, filename) => {
    if (pluginFilter(filename)) {
        let dir = path.join(pluginFolder, filename)
        isi = require(path.join(pluginFolder, filename))
        if (dir in require.cache) {
            delete require.cache[dir]
            if (fs.existsSync(dir)) console.info(`re - require plugin '${filename}'`)
            else {
                console.log(`deleted plugin '${filename}'`)
                return isi.function ? delete global.functions[filename] : delete global.commands[filename]
            }
        } else console.info(`requiring new plugin '${filename}'`)
        let err = syntaxerror(fs.readFileSync(dir), filename)
        if (err) console.log(`syntax error while loading '${filename}'\n${err}`)
        else
            try {
                isi.function ? global.functions[filename] = require(dir) : global.commands[filename] = require(dir)
            } catch (e) {
                console.log(e)
            } finally {
                isi.function ? global.functions = Object.fromEntries(Object.entries(global.functions).sort(([a], [b]) => a.localeCompare(b))) : global.commands = Object.fromEntries(Object.entries(global.commands).sort(([a], [b]) => a.localeCompare(b)))
            }
    }
}
Object.freeze(global.reload)
fs.watch(path.join(__dirname, 'commands'), global.reload)
client.on('auth_failure', msg => console.log(msg))
client.on('message', async msg => {
    client.msgdata = client.msgdata ? client.msgdata : []
    if (msg.type == 'chat' || msg.type == 'image' || msg.type == 'video' || msg.type == 'list_response') {
        if (client.msgdata.length > 50) client.msgdata = []
        if (msg.type == 'list_response' || msg.body.startsWith('.')) {
            coman = await Object.values(global.commands).find((rescmd) => !rescmd.disabled && rescmd.cmd.includes(msg.body.split(' ')[0].replace('.', '')))
            if(coman != undefined){
                await client.msgdata.push({
                    caption: msg.type === 'list_response' ? msg.selectedRowId : msg.body,
                    msgId: msg.id._serialized,
                    sender: msg.id.remote.endsWith('@g.us') ? msg.author : msg.from,
                    group: msg.id.remote.endsWith('@g.us') ? msg.from : false
                })
            }
            await require('./lib/handler').handler(msg, client)
        }
    }
    await require('./lib/function').handler(msg, client)
});
client.on('group_update', async upt => {
    await require('./events/group_update')(upt, client)
})
client.on('group_join', async upt => {
    await require('./events/greetings').welcome(upt, client)
})
client.on('group_leave', async upt => {
    await require('./events/greetings').left(upt, client)
})
client.on('incoming_call', async call => {
    await require('./events/call.js')(call, client)
})
let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log("Update 'index.js'")
    delete require.cache[file]
    if (global.reload) console.log(global.reload())
})