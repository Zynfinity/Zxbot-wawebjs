const { stickerMetadata } = require("../lib/config")
const fs = require('fs')
const ra = require('ra-api')
module.exports = {
    name: ['meme', 'smeme'].map((v) => v + ' <teks1|teks2>'),
    cmd: ['meme','smeme'],
    category: 'convert',
    desc: ['Menambahkan teks ke dalam gambar', '.meme/smeme <teks1|teks2>'],
    async handler(m, {conn, msgId, zx, text, hasQuotedMsg, hasMedia, quotedMsg}){
        try{
            if(!text) return await m.reply(`Masukkan teksnya dengan format text1|teks2\nExample : .${m.command} test|oke`)
            if(hasMedia && m.type == 'image' || (hasQuotedMsg ? quotedMsg.type == 'image' || quotedMsg.type == 'sticker' : false)){
                await m.reply(global.mess.wait)
                quot = hasMedia ? '' : await m.getQuotedMessage()
                down = hasMedia ? await m.downloadMedia() : await quot.downloadMedia()
                if(down == undefined) return m.reply('Media not found, please resend media!')
                buff = await Buffer.from(down.data, 'base64')
                const filepath = `./lib/utils/${m.command}_${m.sender}.jpg`
                await fs.writeFileSync(filepath, buff)
                upload = await ra.UploadFile(filepath)
                sticker = m.command == 'smeme' ? true : false
                txt = `${text.split('|')[0] != '' ? text.split('|')[0].replace('?', '') : '_'}/${text.split('|')[1] != undefined ? text.split('|')[1].replace('?', '') : '_'}`
                await conn.sendFileFromUrl(m.from, `https://api.memegen.link/images/custom/${txt}.png?background=${upload.result.namaFile}`, {
                    ctwa: {type: 'link'}, 
                    quotedMessageId: msgId,
                    caption: '*Done*',
                    sendMediaAsSticker: sticker,
                    ...stickerMetadata
                })
                await fs.unlinkSync(filepath)
            }
            else m.reply('reply gambar/sticker dengan caption .' + m.command)
        }catch(e){
            global.eror(m.command, e, m)
        }
    }
}