module.exports = {
    name: ['setgroupname'].map((v) => v + ' <name>'),
    cmd: /^(setgroupname)$/i,
    category: 'group',
    desc: ['Mengubah nama Group!', '.setgroupname <name>'],
    group: true,
    admin: true,
    botAdmin: true,
    async handler(m, {conn, zx, text}){
        if(!text) return m.reply('Mau diganti jadi apa?')
        await zx.setSubject(text)
        m.reply('Berhasil mengubah nama group menjadi : ' + text)
    }
}