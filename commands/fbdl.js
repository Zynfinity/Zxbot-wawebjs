const { facebook } = require("../lib/scraper")
module.exports = {
	name: ['facebook'].map((v) => v + ' <link>'),
	cmd: ['facebook','fb','fbdl'],
	category: 'downloader',
    desc: ['Mendownload media dari facebook', 'facebook <link>'],
	async handler(m, {conn,  msgId, text}){
        try{
            if(!text) return await m.reply('Linknya mana?')
            if(!m.isUrl(text)) return await m.reply(global.mess.errorlink)
            await m.reply(global.mess.wait)
            const res = await facebook(text)
            fb = `*F B  D O W N L O A D E R*`
            await conn.sendFileFromUrl(m.from, res.resource.hd, {ctwa: {type: 'link'},caption: fb, quotedMessageId: msgId})
        }catch(e){
            global.eror(m.command, e, m)
        }
	}
}