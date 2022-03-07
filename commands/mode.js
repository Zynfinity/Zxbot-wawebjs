module.exports = {
	name: ['public', 'self'].map((v) => v + ''),
	cmd: /^(public|self)$/i,
	category: 'owner',
	owner: true,
	async handler(m, {conn, command}){
		conn.mode = conn.mode ? conn.mode : 'public'
		ready = command == 'self' ? 'Mode Self telah diaktifkan sebelumnya!' : 'Mode Public telah diaktifkan sebelumnya!'
		if(command == 'self' ? conn.mode == 'self' : conn.mode == 'public') return m.reply(ready)
		command == 'self' ? conn.mode = 'self' : conn.mode = 'public'
		command == 'self' ? m.reply('Self mode active') : m.reply('Public mode active')
	}
}