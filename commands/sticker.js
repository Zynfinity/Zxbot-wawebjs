const {stickerMetadata, gifcrop} = require('../lib/config')
module.exports = {
    name: ['sticker'].map((v) => v + ' <reply/send image>'),
    cmd: /^(sticker|s|stiker)$/i,
    category: 'convert',
    desc: ['Mengubah gambar menjadi stiker', '.sticker <reply/send image>'],
    async handler(m, {conn, msgId, zx, hasMedia, type, quotedMsg, command}){
        if(hasMedia && type == 'image' || hasMedia && type == 'video'){
            const media = await m.downloadMedia()
            conn.sendSticker(zx, media, stickerMetadata.stickerName, stickerMetadata.stickerAuthor, {quotedMessageId: msgId})
        }
        else if(quotedMsg && quotedMsg.type == 'image' || quotedMsg && quotedMsg.type == 'video'){
            const quot = await m.getQuotedMessage()
            const media = await quot.downloadMedia()
            conn.sendSticker(zx, media, stickerMetadata.stickerName, stickerMetadata.stickerAuthor, {quotedMessageId: msgId})
        }
        else conn.reply(m, `reply/send image dengan caption .${command}`, msgId)

    }
}