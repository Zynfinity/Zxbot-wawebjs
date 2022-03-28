const { peakpx } = require("../lib/scraper")

module.exports = {
	name: ['wallpaper'].map((v) => v + ' <query>'),
	cmd: ['wallpaper','wall'],
	category: 'search',
	desc: ['Mencari wallpaper', '.@m.command <query>'],
	async handler(m, {conn,  msgId, text}){
		try{
            if(!text) return m.reply('mau cari apa?')
            await m.reply(global.mess.wait)
            peakpx(text).then(async res => {
                rand = res[Math.floor(Math.random() * res.length)]
                await conn.sendFileFromUrl(m.from, rand.image, {caption: rand.title, quotedMessageId: msgId})
            })
        }catch(e){
            global.eror(m.command, e, m)
        }
	}
}