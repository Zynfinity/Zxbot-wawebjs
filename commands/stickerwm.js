const {stickerMetadata, gifcrop} = require('../lib/config')
module.exports = {
    name: ['takestick', 'stickerwm'].map((v) => v + ' <reply/send image>'),
    cmd: /^(takestick|take|swm|stickerwm)$/i,
    category: 'convert',
    desc: ['Mengubah gambar/sticker menjadi stikerwm', '.stickerwm <reply/send image>'],
    async handler(m, {conn, hasMedia, type, mimetype, quotedMsg, command,zx, text}){
        const stcdata = {author: text.split('|')[1], pack: text.split('|')[0], keepScale: true}
        if(hasMedia && type == 'image' || hasMedia && type == 'video'){
            const media = await m.downloadMedia()
            conn.sendSticker(zx, media, stcdata.pack, stcdata.author, {quotedMessageId: m.msgId})
        }
        else if(quotedMsg && quotedMsg.type == 'image' || quotedMsg && quotedMsg.type == 'video' || quotedMsg && quotedMsg.type == 'sticker'){
            const quot = await m.getQuotedMessage()
            const media = await quot.downloadMedia()
            conn.sendSticker(zx, media, stcdata.pack, stcdata.author, {quotedMessageId: m.msgId})
        }
        else m.reply(`reply image/sticker dengan caption .${command} <pack|author>`)

    }
}