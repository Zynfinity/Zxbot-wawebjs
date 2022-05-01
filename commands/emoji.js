const { stickerMetadata } = require("../lib/config")
const { emoji } = require("../lib/scraper")
module.exports = {
	name: ['emoji <emoji>', 'emojimix <emoji1emoji2>'],
	cmd: ['emoji','emojimix'],
	category: 'convert',
	desc: ['Mengubah emoji menjadi sticker', '.emoji <emoji>'],
	async handler(m, {conn, text, msgId, args}){
		try{
            function emojiStringToArray(str) {
                split = str.split(/([\uD800-\uDBFF][\uDC00-\uDFFF])/)
                arr = []
                for (var i = 0; i < split.length; i++) {
                  char = split[i]
                  if (char !== '') {
                    arr.push(char)
                  }
                }
                return arr
              }
            if(!args[0]) return await m.reply('Emojinya mana?')
            await m.reply(global.mess.wait)
            if(m.command == 'emoji'){
              emoji(await emojiStringToArray(args[0])[0]).then(async x => {
                  await conn.sendStickerFromUrl(m.from, x.result.whatsapp, args[0], stickerMetadata.stickerAuthor, {ctwa: {type: 'link'},quotedMessageId: msgId})
              })
            }
            else{
              emojis = await emojiStringToArray(await text.replace('+', ''))
              emojimix = await caliph.other.emojimix(emojis[0], emojis[1])
              //if(emojimix.status == 404) return m.reply('Emoji not support!')
              await conn.sendFileFromBuffer(m.from, emojimix, {ctwa: {type: 'link'},mimetype: 'image/jpeg',sendMediaAsSticker: true, ...stickerMetadata, quotedMessageId: msgId})
            }
        }catch(e){
          if(m.command == 'emojimix') return m.reply('Emoji not support')
            global.eror(m.command, e, m)
        }
	}
}