const {toTimer} = require('../lib/tools')
module.exports = {
	name: ['runtime'].map((v) => v + ''),
	cmd: ['runtime'],
	category: 'other',
	async handler(m, {conn,  msgId}){
		m.reply(`Runtime : ${await toTimer(process.uptime())}`)
	}
}