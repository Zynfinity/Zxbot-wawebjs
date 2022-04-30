const { removeBackgroundFromImageFile, removeBackgroundFromImageUrl} = require('remove.bg')
const { telegraph } = require('../lib/tools')
const fs = require('fs')
const {exec} = require('child_process')
const { stickerMetadata } = require('../lib/config')
module.exports = {
	name: ['nobg', 'snobg'].map((v) => v + ''),
	cmd: ['nobg', 'snobg'],
	category: 'convert',
    desc: ['menghilangkan background pada foto/sticker'],
	async handler(m, {conn, quotedMsg, hasQuotedMsg, hasMedia, msgId, args}){
        try{
            issticker = m.command == 'nobg' ? false : true
            if(hasQuotedMsg && quotedMsg.type == 'image' || hasMedia && m.type == 'image'){
                await m.reply(mess.wait)
                const turl = await telegraph(hasMedia ? await m.download() : await m.quoted.download())
                console.log(turl)
                const remove = await removeBackgroundFromImageUrl({
                    url: turl,
                    apiKey: '2mZbr62TiNKYw3rFPPtb4BYn',
                    bg_color: args != '' && args[0].startsWith('-color') ? args[1] : '',
                    size: "regular",
                    type: "auto",
                    scale: '100%'
                })
                await conn.sendFileFromBuffer(m.from, await remove.base64img, {...stickerMetadata, quotedMessageId: msgId, filename: 'removebg.jpg', sendMediaAsSticker: issticker ? true : false, sendMediaAsDocument: !issticker ? true : false, mimetype: 'image/jpeg'})
            }
            else if(hasQuotedMsg && quotedMsg.type == 'sticker'){
                await m.reply(mess.wait)
                const fname = await tools.getRandom()
                path = `./lib/tmp/${fname}.jpg`
                output = `./lib/tmp/${fname}.png`
                await fs.writeFileSync(path, await m.quoted.download())
                exec(`ffmpeg -i ${path} ${output}`, async (err) => {
                    await fs.unlinkSync(path)
                    if (err) {
                        m.reply('Error saat konversi webp ke jpg')
                    } else {
                        const remove = await removeBackgroundFromImageFile({
                            path: output,
                            apiKey: "2mZbr62TiNKYw3rFPPtb4BYn",
                            bg_color: args != '' && args[0].startsWith('-color') ? args[1] : '',
                            size: "regular",
                            type: "auto",
                            scale: "100%",
                        })
                        await conn.sendFileFromBuffer(m.from, await remove.base64img, {...stickerMetadata, quotedMessageId: msgId, filename: 'removebg.jpg', sendMediaAsSticker: issticker ? true : false, sendMediaAsDocument: !issticker ? true : false, mimetype: 'image/jpeg'})
                        await fs.unlinkSync(output)
                    }
                })
            }
            else m.reply('Reply image/sticker dengan caption .' + m.command)
    }catch(e){
        global.eror(m.command, e, m)
    }
	}
}