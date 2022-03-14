const { stickerMetadata } = require("../lib/config")
const fs = require('fs')
const ra = require('ra-api')
module.exports = {
    name: ['meme', 'smeme'].map((v) => v + ' <teks1|teks2>'),
    cmd: /^(meme|smeme)$/i,
    category: 'convert',
    desc: ['Menambahkan teks ke dalam gambar', '.meme/smeme <teks1|teks2>'],
    async handler(m, {conn, zx, text, command, hasQuotedMsg, hasMedia, quotedMsg}){
        try{
            if(!text) return await conn.reply(m, `Masukkan teksnya dengan format text1|teks2\nExample : .${command} test|oke`)
            if(hasMedia && m.type == 'image' || (hasQuotedMsg && quotedMsg.type == 'image' || quotedMsg.type == 'sticker')){
                await conn.reply(m, global.mess.wait)
                quot = hasMedia ? '' : await m.getQuotedMessage()
                down = hasMedia ? await m.downloadMedia() : await quot.downloadMedia()
                buff = await Buffer.from(down.data, 'base64')
                filepath = `./lib/utils/${command}_${m.sender}.jpg`
                await fs.writeFileSync(filepath, buff)
                upload = await ra.UploadFile(filepath)
                sticker = command == 'smeme' ? true : false
                await conn.sendFileFromUrl(m.from, `https://api.memegen.link/images/custom/${text.split('|')[0]}/${text.split('|')[1]}.png?background=${upload.result.namaFile}`, {
                    quotedMessageId: m.msgId,
                    caption: '*Done*',
                    sendMediaAsSticker: sticker,
                    ...stickerMetadata
                })
                fs.unlinkSync(filepath)
            }
            else conn.reply(m, 'reply gambar/sticker dengan caption .' + command)
        }catch(e){
            global.eror(global.command, e, m)
        }
    }
}