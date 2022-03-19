module.exports = {
	name: ['public', 'self'].map((v) => v + ''),
	cmd: ['public','self'],
	category: 'owner',
	owner: true,
	async handler(m, {conn, msgId}){
		conn.mode = conn.mode ? conn.mode : 'public'
		ready = m.command == 'self' ? 'Mode Self telah diaktifkan sebelumnya!' : 'Mode Public telah diaktifkan sebelumnya!'
		if(m.command == 'self' ? conn.mode == 'self' : conn.mode == 'public') return await m.reply(ready)
		m.command == 'self' ? conn.mode = 'self' : conn.mode = 'public'
		m.command == 'self' ? m.reply('Self mode active') : m.reply('Public mode active')
	}
}