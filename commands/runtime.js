const {toTimer} = require('../lib/tools')
module.exports = {
	name: 'runtime',
	cmd: ['runtime'],
	async handler(m, {conn}){
		conn.reply(m.from, `Runtime : ${await toTimer(process.uptime())}`, m.id)
	}
}
