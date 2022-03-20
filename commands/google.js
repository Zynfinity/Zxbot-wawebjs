const ggs = require('google-it')
module.exports = {
	name: ['google'].map((v) => v + ' <query>'),
	cmd: ['google'],
	category: 'search',
	desc: ['Mencari sesuatu berdasarkan query di Google.com', '.google <query>'],
	async handler(m, {conn,  msgId, text}){
		try{
			if(!text) return await m.reply('Mau cari apa?')
			await m.reply(global.mess.wait)
			google = `${global.shp} *GOOGLE SEARCH*\n`
			data = await ggs({query: text})
			data.map(res => {
				google += `├ *Title* : ${res.title}\n`
				google += `├ *Link* : ${res.link}\n`
				google += `└ *Description* : ${res.snippet}\n\n${global.shp}\n`
			})
			await m.reply(google)
		}catch(e){
			global.eror(m.commands, e, m)
		}
	}
}