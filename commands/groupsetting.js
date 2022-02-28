module.exports = {
    name: ['group'].map((v) => v + ' <open/close>'),
    cmd: /^(group|gc|grup)$/i,
    category: 'group',
    desc: ['Membuka/menutup group', '.group <open/close>'],
    admin: true,
    botAdmin: true,
    group: true,
    disabled: true,
    async handler(m, {conn, args}){
        if(args[0] == 'open'){
            conn.setGroupToAdminsOnly(m.from, false)
            conn.reply(m.from, 'Berhasil membuka group!\nsekarang semua member bisa mengirim pesan!', m.id)
        }
        else if(args[0] == 'close'){
            conn.setGroupToAdminsOnly(m.from, true)
            conn.reply(m.from, 'Berhasil menutup group!\nsekarang hanya admin yang bisa mengirim pesan!', m.id)
        }
    }
}