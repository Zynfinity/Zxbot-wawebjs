const got = require('got')
const { owner } = require("../lib/config")

module.exports = {
    function: true,
    async handler(m, {conn, zx, msgId, budy}){
        try{
            if(zx.isGroup) return
            if(m.command == undefined || m.command == ''){
                const {body} = await got.get(`https://api.simsimi.net/v2/?text=${budy}&lc=id`)
                data = JSON.parse(body)
                await conn.sendMessage(m.from, data.success, {quotedMessageId: msgId})
            }
        }catch{
            conn.sendText(owner, 'Simi error')
        }
    }
}