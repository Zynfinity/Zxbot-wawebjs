const axios = require('axios')
const encodeurl = require('encodeurl')
const { stickerMetadata } = require('../lib/config')
module.exports = {
    name: ['ttp', 'attp'].map((v) => v + ' <text>'),
    cmd: ['ttp', 'attp'],
    category: 'convert',
    desc: ['Mengubah teks ke sticker', '.@command <text>'],
    async handler(m, {conn, msgId, text}){
        try{
            if(!text) return m.reply('Teksnya mana?')
            await m.reply(global.mess.wait)
            if(m.command == 'ttp'){
                const {data} = await axios.get(`https://xteam.xyz/ttp?text=${encodeurl(text)}`)
                await conn.sendFileFromBuffer(m.from, data.result.split('data:image/png;base64,')[1], {ctwa: {type: 'link'},mimetype: 'image/png', sendMediaAsSticker: true, ...stickerMetadata, quotedMessageId: msgId})
            }
            else{
                const {data} = await axios.get(`https://xteam.xyz/attp?text=${encodeurl(text)}`)
                await conn.sendFileFromBuffer(m.from, data.result.split('data:image/webp;base64,')[1], {ctwa: {type: 'link'},mimetype: 'image/png', sendMediaAsSticker: true, ...stickerMetadata, quotedMessageId: msgId})
            }
        }catch(e){
            global.eror(m.command, e, m)
        }
    }
}