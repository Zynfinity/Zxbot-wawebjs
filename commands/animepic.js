const axios = require('axios')
module.exports = {
    name: ['waifu', 'neko'],
    cmd: ['waifu', 'neko'],
    category: 'anime',
    async handler(m, {conn, msgId}){
        try{
            m.reply(mess.wait)
            if(m.command == 'waifu'){
                const {data} = await axios.get('https://api.waifu.im/random/?is_nsfw=false&full=false')
                await conn.sendFileFromUrl(m.from, data.images[0].url, {caption: data.images[0].url, quotedMessageId: msgId})
            }
            else if(m.command == 'neko'){
                const {data} = await axios.get('https://neko-love.xyz/api/v1/neko')
                await conn.sendFileFromUrl(m.from, data.url, {caption: data.url, quotedMessageId: msgId})
            }
        }catch(e){
            global.eror(m.command, e, m)
        }
    }
}