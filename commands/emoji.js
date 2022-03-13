const { stickerMetadata } = require("../lib/config")
const { emoji } = require("../lib/scraper")
module.exports = {
	name: ['emoji'].map((v) => v + ' <emoji>'),
	cmd: /^(emoji)$/i,
	category: 'convert',
	desc: ['Mengubah emoji menjadi sticker', '.emoji <emoji>'],
	async handler(m, {conn, args}){
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
            if(!args[0]) return conn.reply(m, 'Emojinya mana?')
            await conn.reply(m, global.mess.wait)
            emoji(await emojiStringToArray(args[0])[0]).then(x => {
                conn.sendStickerFromUrl(m.from, x.result.whatsapp, args[0], stickerMetadata.stickerAuthor, {quotedMessageId: m.msgId})
            })
        }catch(e){
            global.eror(global.command, e, m)
        }
	}
}