const wa = require('@open-wa/wa-automate');
const fs = require('fs')
const path = require('path')
// AUTO UPDATE BY NURUTOMO
// THX FOR NURUTOMO
// Cache handler and check for file change
require('./index.js')
nocache('./index.js', module => console.log(`'${module}' Updated!`))
wa.create({
    sessionId: "multidevice",
    multiDevice: false, //required to enable multiDevice support
    authTimeout: 60, //wait only 60 seconds to get a connection with the host account device
    blockCrashLogs: true,
    disableSpins: true,
    headless: true,
    hostNotificationLang: 'PT_BR',
    logConsole: false,
    popup: false,
    qrTimeout: 0, //0 means it will wait forever for you to scan the qr code
}).then(client => start(client));


//read command
let pluginFolder = path.join(__dirname, 'commands')
let pluginFilter = (filename) => /\.js$/.test(filename)
global.plugins = {}
for (let filename of fs.readdirSync(pluginFolder).filter(pluginFilter)) {
    try {
        global.plugins[filename] = require(path.join(pluginFolder, filename))
    } catch (e) {
        console.log(e)
    }
}

function start(client) {
    client.onMessage(async message => {
      try{
        require('./lib/handler').handler(message, client)
      }catch(e){
        client.reply(message.from, String(e), message.id)
      }
    });
}

function nocache(module, cb = () => {}) {
    console.log('Module', `'${module}'`, 'is now being watched for changes')
    fs.watchFile(require.resolve(module), async () => {
        await uncache(require.resolve(module))
        cb(module)
    })
}

/**
 * Uncache a module
 * @param {string} module Module name or path
 */
function uncache(module = '.') {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(module)]
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}
