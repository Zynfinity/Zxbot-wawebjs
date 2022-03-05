module.exports = {
    name: ['group'].map((v) => v + ' <open/close>'),
    cmd: /^(group|gc|grup)$/i,
    category: 'group',
    desc: ['Membuka/menutup group', '.group <open/close>'],
    admin: true,
    botAdmin: true,
    group: true,
    async handler(m, {conn, zx, args}){
        if(args[0] == 'open'){
            await zx.setMessagesAdminsOnly(false)
            m.reply('Berhasil membuka group!\nsekarang semua member bisa mengirim pesan!')
        }
        else if(args[0] == 'close'){
            await zx.setMessagesAdminsOnly(true)
            m.reply('Berhasil menutup group!\nsekarang hanya admin yang bisa mengirim pesan!')
        }
    }
}