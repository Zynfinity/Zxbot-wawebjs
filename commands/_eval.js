const fs = require('fs')
const tools = require('../lib/tools')
const textmaker = require('../lib/textmaker')
const {
    MessageMedia
} = require('whatsapp-web.js')
const {
    exec
} = require('child_process')
module.exports = {
    name: ['<', '$', '=>'].map((v) => v + ' <Your Code>'),
    function: true,
    category: 'owner',
    menu: true,
    async handler(m, {conn,budy,isOwner,msgId,zx,q}){
        const util = require('util')
        if (!isOwner) return
        try{
            if (budy.startsWith('<')) {
                console.log("E V A L")
                async function _(rem) {
                    ren = JSON.stringify(rem, null, 2)
                    pes = util.format(ren)
                    await m.reply(pes)
                }
                await m.reply(await require('util').format(eval(`(async () => { ${budy.slice(2)} })()`)))
            }else if(budy.startsWith('=>')){
                console.log("E V A L  V 2")
                let evaled = await eval(budy.slice(3))
                if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
                await m.reply(evaled)
            } 
            else if (budy.startsWith('$')) {
                console.log("E X E C")
                if (!budy.slice(2)) return await m.reply('Masukkan Codenya!')
                exec(budy.slice(2), async (err, stdout) => {
                    if (err) return await m.reply(String(err))
                    await m.reply(stdout)
                })
            }
        }catch(e){
            m.reply(String(e))
        }
    }
}