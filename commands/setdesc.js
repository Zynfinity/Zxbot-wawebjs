module.exports = {
    name: ['setdesc'].map((v) => v + ' <desc>'),
    cmd: ['setdesc'],
    category: 'group',
    desc: ['Mengganti deskripsi Group', '.setdesc <desc>'],
    group: true,
    admin: true,
    botAdmin: true,
    async handler(m, {conn,  msgId, zx, text}){
        if(!text) return await m.reply('Mau diganti jadi apa?')
        await zx.setDescription(text)
    }
}