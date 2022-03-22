const fs = require('fs')
const path = require('path')
const syntaxerror = require('syntax-error')
const qrcode = require('qrcode-terminal')
const djs = require("@discordjs/collection");
const { Client, LocalAuth } = require('whatsapp-web.js');
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: { headless: true, executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' }
});
require('./lib/database/database').connectToDatabase()
client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    qrcode.generate(qr, {small: true}, function (qrcode) {
      console.log(qrcode)
  });
    console.log('Scan Qr Code');
});
client.on('ready', () => {
    console.log('Client is ready!');
});
//read command
let pluginFolder = path.join(__dirname, 'commands')
let pluginFilter = (filename) => /\.js$/.test(filename)
//global.plugins = {}
djs.commands = new djs.Collection()
for (let filename of fs.readdirSync(pluginFolder).filter(pluginFilter)) {
    try {
        plugins = require(path.join(pluginFolder, filename))
        //console.log(plugins)
        djs.commands.set(plugins.name[0], plugins)
    } catch (e) {
        console.log(e)
    }
}
global.reload = (_event, filename) => {
    if (pluginFilter(filename)) {
      let dir = path.join(pluginFolder, filename)
      if (dir in require.cache) {
        delete require.cache[dir]
        if (fs.existsSync(dir)) console.info(`re - require plugin '${filename}'`)
        else {
          console.log(`deleted plugin '${filename}'`)
          //return delete global.plugins[filename]
        }
      } else console.info(`requiring new plugin '${filename}'`)
      let err = syntaxerror(fs.readFileSync(dir), filename)
      if (err) console.log(`syntax error while loading '${filename}'\n${err}`)
      else
        try {
         // global.plugins[filename] = require(dir)
         plug = require(dir)
         djs.commands.set(plug.name[0], plug)
        } catch (e) {
          console.log(e)
        } finally {
          //global.plugins = Object.fromEntries(Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b)))
        }
    }
  }
  Object.freeze(global.reload)
  fs.watch(path.join(__dirname, 'commands'), global.reload)

client.on('message', async msg => {
  exports.m = msg
if(msg.type != 'chat' && msg.type != 'image' && msg.type != 'video' && msg.type != 'list_response') return
  await require('./lib/handler').handler(msg, client)
});
client.on('message_revoke_everyone', async (after, before) => {
});
client.on('group_update', upt => {
  require('./events/group_update')(upt, client)
})
client.on('group_join', async upt => {
  await require('./events/greetings').welcome(upt, client)
})
client.on('group_leave', upt => {
  require('./events/greetings').left(upt, client)
})
client.initialize();

let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log("Update 'index.js'")
  delete require.cache[file]
  if (global.reload) console.log(global.reload())
})