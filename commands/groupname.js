module.exports = {
    name: ['setgroupname'].map((v) => v + ' <name>'),
    cmd: ['setgroupname'],
    category: 'group',
    desc: ['Mengubah nama Group!', '.setgroupname <name>'],
    group: true,
    admin: true,
    botAdmin: true,
    async handler(m, {conn,  msgId, zx, text}){
        if(!text) return await m.reply('Mau diganti jadi apa?')
        await zx.setSubject(text)
    }
}