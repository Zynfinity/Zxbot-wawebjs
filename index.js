const wa = require('@open-wa/wa-automate');
const fs = require('fs')
const path = require('path')
const syntaxerror = require('syntax-error')
wa.create({
    sessionId: "multidevice",
    multiDevice: true, //required to enable multiDevice support
    authTimeout: 60, //wait only 60 seconds to get a connection with the host account device
    blockCrashLogs: true,
    disableSpins: true,
    useChrome: true,
    headless: true,
    hostNotificationLang: 'PT_BR',
    logConsole: false,
    popup: false,
    qrTimeout: 0, //0 means it will wait forever for you to scan the qr code
}).then(async client => {
  await require('./lib/database/database').connectToDatabase()
  start(client)
});


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

let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log("Update 'index.js'")
  delete require.cache[file]
  if (global.reload) console.log(global.reload())
})