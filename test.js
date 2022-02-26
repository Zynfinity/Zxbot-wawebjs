const fs = require('fs')
const path = require('path')
let pluginFolder = path.join(__dirname, 'commands')
let pluginFilter = (filename) => /\.js$/.test(filename)
global.commands = {}
for (let filename of fs.readdirSync(pluginFolder).filter(pluginFilter)) {
    try {
        global.commands[filename] = require(path.join(pluginFolder, filename))
    } catch (e) {
        console.log(e)
    }
}
console.log(global.commands)
for(name in commands){
  plugin = commands[name]
  if(plugin.name){
    plugin.handler(mess, extra)
    return
  }
}