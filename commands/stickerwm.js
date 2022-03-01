const { decryptMedia } = require('@open-wa/wa-automate')
const uao = process.env.UserAgent
const {stickerMetadata, gifcrop} = require('../lib/config')
module.exports = {
    name: ['takestick', 'stickerwm'].map((v) => v + ' <reply/send image>'),
    cmd: /^(takestick|take|swm|stickerwm)$/i,
    category: 'convert',
    desc: ['Mengubah gambar/sticker menjadi stikerwm', '.stickerwm <reply/send image>'],
    async handler(m, {conn, isMedia, type, mimetype, quotedMsg, command, text}){
        const stcdata = {author: text.split('|')[1], pack: text.split('|')[0], keepScale: true}
        if(isMedia && type == 'image' || isMedia && type == 'video'){
            const mediaData = await decryptMedia(m, uao)
            const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
            if(type == 'image') conn.sendImageAsSticker(m.from, imageBase64, stcdata)
            else conn.sendMp4AsSticker(m.from, imageBase64, gifcrop, stcdata)
        }
        else if(quotedMsg && quotedMsg.type == 'image' || quotedMsg && quotedMsg.type == 'video' || quotedMsg && quotedMsg.type == 'sticker'){
            const mediaData = await decryptMedia(quotedMsg, uao)
            const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
            if(quotedMsg.type == 'image') conn.sendImageAsSticker(m.from, imageBase64, stcdata)
            else if(quotedMsg.type == 'sticker') conn.sendImageAsSticker(m.from, imageBase64, stcdata)
            else conn.sendMp4AsSticker(m.from, imageBase64, gifcrop, stcdata)
        }
        else conn.reply(m.from, `reply image/sticker dengan caption .${command} <pack|author>`, m.id)

    }
}