const axios = require('axios')
module.exports = {
    name: ['waifu', 'neko', 'loli'],
    cmd: ['waifu', 'neko', 'loli'],
    category: 'anime',
    async handler(m, {conn, msgId}){
        try{
            m.reply(mess.wait)
            if(m.command == 'waifu'){
                const {data} = await axios.get('https://api.waifu.pics/sfw/waifu')
                await conn.sendFileFromUrl(m.from, data.url, {ctwa: {type: 'link'}, caption: data.url, quotedMessageId: msgId})
            }
            else if(m.command == 'neko'){
                const {data} = await axios.get('https://neko-love.xyz/api/v1/neko')
                await conn.sendFileFromUrl(m.from, data.url, {ctwa: {type: 'link'}, caption: data.url, quotedMessageId: msgId})
            }
            else if(m.command == 'loli'){
                const {data} = await axios.get('https://lolis-life-api.herokuapp.com/getLoli')
                await conn.sendFileFromUrl(m.from, data.url, {ctwa: {type: 'link'}, caption: data.url, quotedMessageId: msgId})
            }
        }catch(e){
            global.eror(m.command, e, m)
        }
    }
}