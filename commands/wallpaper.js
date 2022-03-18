const { peakpx } = require("../lib/scraper")

module.exports = {
	name: ['wallpaper'].map((v) => v + ' <query>'),
	cmd: /^(wallpaper|wall)$/i,
	category: 'search',
	desc: ['Mencari wallpaper', '.@command <query>'],
	async handler(m, {conn, msgId, text}){
		try{
            if(!text) return conn.reply(m, 'mau cari apa?', msgId)
            await conn.reply(m, global.mess.wait, msgId)
            peakpx(text).then(async res => {
                rand = res[Math.floor(Math.random() * res.length)]
                console.log(rand)
                await conn.sendFileFromUrl(m.from, rand.image, {caption: rand.title, quotedMessageId: msgId})
            })
        }catch(e){
            global.eror(global.command, e, m)
        }
	}
}