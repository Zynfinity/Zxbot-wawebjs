module.exports = {
    name: ['group'].map((v) => v + ' <open/close>'),
    cmd: /^(group|gc|grup)$/i,
    category: 'group',
    desc: ['Membuka/menutup group', '.group <open/close>'],
    admin: true,
    botAdmin: true,
    group: true,
    async handler(m, {conn, msgId, zx, args}){
        if(args[0] == 'open'){
            if(!zx.groupMetadata.announce) return await conn.reply(m, 'Group sudah dibuka sebelumnya', msgId)
            await zx.setMessagesAdminsOnly(false)
            //conn.reply(m, 'Berhasil membuka group!\nsekarang semua member bisa mengirim pesan!')
        }
        else if(args[0] == 'close'){
            if(zx.groupMetadata.announce) return await conn.reply(m, 'Group sudah ditutup sebelumnya', msgId)
            await zx.setMessagesAdminsOnly(true)
            //conn.reply(m, 'Berhasil menutup group!\nsekarang hanya admin yang bisa mengirim pesan!')
        }
    }
}