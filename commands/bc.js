const {sleep} = require('../lib/tools')
module.exports = {
	name: ['bcgc', 'bc'].map((v) => v + ' <pesan>'),
	cmd: ['bcgc','bc'],
	category: 'owner',
	desc: ['Mengirim pesan ke semua group'],
	owner: true,
	async handler(m, {conn,  msgId, zx, hasQuotedMsg, quotedMsg, hasMedia, text}){
		chat = await conn.getChats()
		id = m.command == 'bcgc' ? chat.filter(s => s.isGroup).map(v => v.id._serialized) : chat.map(s => s.id._serialized)
		bc = text ? text : ''
		bc += `${text ? '\n\n' : ''}[ *ZXBOT BROADCAST* ]`
		if(hasMedia && m.type == 'video' || hasMedia && m.type == 'image' || hasQuotedMsg){
			down = hasMedia ? await m.downloadMedia() : hasQuotedMsg ? await m.getQuotedMessage().then(async p => await p.downloadMedia()) : false
			if(down == false) return
			isgif = hasQuotedMsg ? quotedMsg.type == 'video' ? bc.includes('-s') ? true : false : false : false
			for(let i of id){
				await conn.sendMessage(i, down, {sendVideoAsGif: isgif, caption: bc.replace(/-s/g, '')})
				await sleep(10000)
			}
		}else{
			for(let i of id){
				await conn.sendMessage(i, bc)
				await sleep(10000)
			}
		}

	}
}