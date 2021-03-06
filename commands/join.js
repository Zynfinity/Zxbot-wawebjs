module.exports = {
    name: ['join'].map((v) => v + ' <link>'),
    cmd: ['join'],
    category: 'owner',
    desc: ['Bergabung ke group menggunakan tautan group', '.join <link>'],
    owner: true,
    async handler(m, {conn,  msgId, text}){
        if(!text) return await m.reply('Masukkan linknya!')
        if(!m.isUrl(text)) return await m.reply(global.mess.wait)
        try{
            ingfo = await conn.getInviteInfo(text.split('/')[3])
            await conn.acceptInvite(text.split('/')[3])
            m.reply(`Berhasil join group ${ingfo.subject} ( ${ingfo.id._serialized} )`)
        }catch{
            m.reply(global.mess.errorlink)
        }
    }
}