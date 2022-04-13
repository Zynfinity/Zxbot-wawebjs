const fs = require('fs')
const { owner } = require('../lib/config')
const { sleep } = require('../lib/tools')
const call = async(call, conn) => {
    conn.sendMessage(owner, JSON.stringify(call, null, 2))
    if(call.from == owner) return
    kon = await conn.getContactById(call.from)
    await conn.sendMessage(call.from, 'ZxBOT will not accept phone calls,\ncalling bot = block')
    await sleep(3000)
    kon.block()
}
module.exports = call
let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log("Update 'call.js'")
    delete require.cache[file]
    if (global.reload) console.log(global.reload())
})