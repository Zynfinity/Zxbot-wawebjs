module.exports = {
    name: ['setdesc'].map((v) => v + ' <desc>'),
    cmd: /^(setdesc)$/i,
    category: 'group',
    desc: ['Mengganti deskripsi Group', '.setdesc <desc>'],
    group: true,
    admin: true,
    botAdmin: true,
    async handler(m, {conn, zx, text}){
        if(!text) return m.reply('Mau diganti jadi apa?')
        await zx.setDescription(text)
        m.reply('Berhasil mengubah deskripsi group menjadi : \n' + text)
    }
}