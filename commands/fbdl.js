const { facebook } = require("../lib/scraper")
module.exports = {
	name: ['facebook'].map((v) => v + ' <link>'),
	cmd: /^(facebook|fb|fbdl)$/i,
	category: 'downloader',
    desc: ['Mendownload media dari facebook', 'facebook <link>'],
	async handler(m, {conn, msgId, text}){
        try{
            if(!text) return await conn.reply(m, 'Linknya mana?', msgId)
            if(!m.isUrl(text)) return await conn.reply(m, global.mess.errorlink, msgId)
            await conn.reply(m, global.mess.wait, msgId)
            facebook(text).then(async res => {
                fb = `*F B  D O W N L O A D E R*\n\n`
                fb += `${global.shp} Caption : ${res.resource.text}`
                await conn.sendFileFromUrl(m.from, res.resource.sd, {caption: fb, quotedMessageId: msgId})
            })
        }catch(e){
            global.eror(global.command, e, m)
        }
	}
}