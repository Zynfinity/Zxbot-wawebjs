const wa = require('@open-wa/wa-automate');
const fs = require('fs')
const path = require('path')
const syntaxerror = require('syntax-error')
// AUTO UPDATE BY NURUTOMO
// THX FOR NURUTOMO
// Cache handler and check for file change
require('./index.js')
nocache('./index.js', module => console.log(`'${module}' Updated!`))
wa.create({
    sessionId: "multidevice",
    multiDevice: true, //required to enable multiDevice support
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
global.reload = (_event, filename) => {
    if (pluginFilter(filename)) {
      let dir = path.join(pluginFolder, filename)
      if (dir in require.cache) {
        delete require.cache[dir]
        if (fs.existsSync(dir)) console.info(`re - require plugin '${filename}'`)
        else {
          console.log(`deleted plugin '${filename}'`)
          return delete global.plugins[filename]
        }
      } else console.info(`requiring new plugin '${filename}'`)
      let err = syntaxerror(fs.readFileSync(dir), filename)
      if (err) console.log(`syntax error while loading '${filename}'\n${err}`)
      else
        try {
          global.plugins[filename] = require(dir)
        } catch (e) {
          console.log(e)
        } finally {
          global.plugins = Object.fromEntries(Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b)))
        }
    }
  }
  Object.freeze(global.reload)
  fs.watch(path.join(__dirname, 'commands'), global.reload)

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
