module.exports = {
	name: ['snapshot'].map((v) => v + ''),
	cmd: /^(snap|snapshot)$/i,
	category: 'owner',
	owner: true,
	disabled: true,
	async handler(m, {conn}){
		conn.getSnapshot().then(res => conn.sendImage(m.from, res, '', 'Snap Session'))
	}
}