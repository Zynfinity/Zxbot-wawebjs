const {stickerMetadata, gifcrop} = require('../lib/config')
module.exports = {
    name: ['sticker'].map((v) => v + ' <reply/send image>'),
    cmd: ['sticker','s','stiker'],
    category: 'convert',
    desc: ['Mengubah gambar menjadi stiker', '.sticker <reply/send image>'],
    async handler(m, {conn, msgId, zx, hasMedia, type, quotedMsg}){
        try{
            if(hasMedia && type == 'image' || hasMedia && type == 'video'){
                const media = await m.downloadMedia()
                await conn.sendSticker(zx, media, stickerMetadata.stickerName, stickerMetadata.stickerAuthor, {quotedMessageId: msgId})
            }
            else if(quotedMsg && quotedMsg.type == 'image' || quotedMsg && quotedMsg.type == 'video'){
                const quot = await m.getQuotedMessage()
                const media = await quot.downloadMedia()
                await conn.sendSticker(zx, media, stickerMetadata.stickerName, stickerMetadata.stickerAuthor, {quotedMessageId: msgId})
            }
            else m.reply(`reply/send image dengan caption .${m.command}`)
        }catch(e){
            global.eror(m.command, e, m)
        }
    }
}