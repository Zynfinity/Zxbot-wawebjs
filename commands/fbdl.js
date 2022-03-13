const { facebook } = require("../lib/scraper")
module.exports = {
	name: ['facebook'].map((v) => v + ' <link>'),
	cmd: /^(facebook|fb|fbdl)$/i,
	category: 'downloader',
    desc: ['Mendownload media dari facebook', 'facebook <link>'],
	async handler(m, {conn, text}){
        try{
            if(!text) return conn.reply(m, 'Linknya mana?')
            if(!m.isUrl(text)) return conn.reply(m, global.mess.errorlink)
            await conn.reply(m, global.mess.wait)
            facebook(text).then(async res => {
                fb = `*F B  D O W N L O A D E R*\n\n`
                fb += `${global.shp} Caption : ${res.resource.text}`
                await conn.sendFileFromUrl(m.from, res.resource.sd, {caption: fb, quotedMessageId: m.msgId})
            })
        }catch(e){
            global.eror(global.command, e, m)
        }
	}
}