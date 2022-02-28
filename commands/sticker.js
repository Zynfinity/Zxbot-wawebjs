const { decryptMedia } = require('@open-wa/wa-automate')
const uao = process.env.UserAgent
const {stickerMetadata, gifcrop} = require('../lib/config')
module.exports = {
    name: ['sticker'].map((v) => v + ' <reply/send image>'),
    cmd: /^(sticker|s|stiker)$/i,
    category: 'convert',
    desc: ['Mengubah gambar menjadi stiker', '.sticker <reply/send image>'],
    async handler(m, {conn, isMedia, type, mimetype, quotedMsg, command}){
        if(isMedia && type == 'image' || isMedia && type == 'video'){
            const mediaData = await decryptMedia(m, uao)
            const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
            if(type == 'image') conn.sendImageAsSticker(m.from, imageBase64, stickerMetadata)
            else conn.sendMp4AsSticker(m.from, imageBase64, gifcrop, stickerMetadata)
        }
        else if(quotedMsg && quotedMsg.type == 'image' || quotedMsg && quotedMsg.type == 'video'){
            const mediaData = await decryptMedia(quotedMsg, uao)
            const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
            if(quotedMsg.type == 'image') conn.sendImageAsSticker(m.from, imageBase64, stickerMetadata)
            else conn.sendMp4AsSticker(m.from, imageBase64, gifcrop, stickerMetadata)
        }
        else conn.reply(m.from, `reply/send image dengan caption .${command}`, m.id)

    }
}
