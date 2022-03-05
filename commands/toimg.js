const { exec } = require("child_process")
const fs = require('fs')
const {getRandom} = require('../lib/tools')
module.exports = {
    name: ['toimg'].map((v) => v + ' <reply sticker>'),
    cmd: /^(toimg)$/i,
    category: 'convert',
    desc: ['Mengubah sticker menjadi gambar/video', '.toimg/tovideo <reply sticker>'],
    async handler(m, {conn, hasQuotedMsg, quotedMsg}){
        if(!hasQuotedMsg) return m.reply('reply stickernya!')
        if(quotedMsg.type == 'sticker' && !quotedMsg.isAnimated){
            m.reply(global.mess.wait)
            quot = await m.getQuotedMessage()
            down = await quot.downloadMedia()
            conn.sendMessage(m.from, down, {quotedMessageId: m.msgId})
        }
    }
}