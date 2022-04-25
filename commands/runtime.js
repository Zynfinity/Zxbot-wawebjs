const { default: axios } = require('axios')
const {toTimer} = require('../lib/tools')
module.exports = {
	name: ['runtime'].map((v) => v + ''),
	cmd: ['runtime'],
	category: 'other',
	async handler(m, {conn,  msgId}){
		const {data} = await axios.get('https://takabot.up.railway.app/')
		m.reply(`Runtime\n\n${global.shp} *Whatsapp-Bot*\n${await toTimer(process.uptime())}\n\n${global.shp} *Telegram*\n${data.runtime}`)
	}
}