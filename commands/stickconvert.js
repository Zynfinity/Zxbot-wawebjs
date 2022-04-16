const { exec } = require("child_process")
const fs = require('fs')
const {getRandom, webp2mp4} = require('../lib/tools')
module.exports = {
    name: ['toimg', 'tovideo', 'togif'].map((v) => v + ' <reply sticker>'),
    cmd: ['toimg', 'tovideo', 'togif'],
    category: 'convert',
    desc: ['Mengubah sticker menjadi gambar/video', '.toimg/tovideo <reply sticker>'],
    async handler(m, {conn,  msgId, hasQuotedMsg, quotedMsg}){
        try{
            if(!hasQuotedMsg) return await m.reply('reply stickernya!')
            if(m.command == 'toimg' && quotedMsg.type == 'sticker' && !quotedMsg.isAnimated){
                m.reply(global.mess.wait)
                quot = await m.getQuotedMessage()
                down = await quot.downloadMedia()
                await conn.sendMessage(m.from, down, {quotedMessageId: msgId})
            }
            else if(m.command == 'tovideo' || m.command == 'togif' && quotedMsg.type == 'sticker'){
                m.reply(global.mess.wait)
                quot = await m.getQuotedMessage()
                down = await quot.downloadMedia()
                buff = await Buffer.from(down.data, 'base64')
                video = await webp2mp4(buff)
                await conn.sendFileFromUrl(m.from, video, {sendVideoAsGif: m.command == 'togif' ? true : false ,quotedMessageId: msgId})
            }
        }catch(e){
            global.eror(m.command, e, m)
        }
    }
}