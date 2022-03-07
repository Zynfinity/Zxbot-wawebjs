const {stickerMetadata, gifcrop} = require('../lib/config')
module.exports = {
    name: ['sticker'].map((v) => v + ' <reply/send image>'),
    cmd: /^(sticker|s|stiker)$/i,
    category: 'convert',
    desc: ['Mengubah gambar menjadi stiker', '.sticker <reply/send image>'],
    async handler(m, {conn, zx, hasMedia, type, quotedMsg, command}){
        if(hasMedia && type == 'image' || hasMedia && type == 'video'){
            const media = await m.downloadMedia()
            conn.sendSticker(zx, media, stickerMetadata.pack, stickerMetadata.author, {quotedMessageId: m.msgId})
        }
        else if(quotedMsg && quotedMsg.type == 'image' || quotedMsg && quotedMsg.type == 'video'){
            const quot = await m.getQuotedMessage()
            const media = await quot.downloadMedia()
            conn.sendSticker(zx, media, stickerMetadata.pack, stickerMetadata.author, {quotedMessageId: m.msgId})
        }
        else m.reply(`reply/send image dengan caption .${command}`)

    }
}
