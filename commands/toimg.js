const { exec } = require("child_process")
const fs = require('fs')
const {getRandom} = require('../lib/tools')
module.exports = {
    name: ['toimg'].map((v) => v + ' <reply sticker>'),
    cmd: /^(toimg)$/i,
    category: 'convert',
    desc: ['Mengubah sticker menjadi gambar/video', '.toimg/tovideo <reply sticker>'],
    async handler(m, {conn, msgId, hasQuotedMsg, quotedMsg}){
        if(!hasQuotedMsg) return await conn.reply(m, 'reply stickernya!', msgId)
        if(quotedMsg.type == 'sticker' && !quotedMsg.isAnimated){
            conn.reply(m, global.mess.wait, msgId)
            quot = await m.getQuotedMessage()
            down = await quot.downloadMedia()
            conn.sendMessage(m.from, down, {quotedMessageId: msgId})
        }
    }
}