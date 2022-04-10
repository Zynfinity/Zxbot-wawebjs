module.exports = {
    name: ['antilink', 'antiviewonce'].map((v) => v + ' <on/off>'),
    cmd: ['antilink', 'antiviewonce'],
    category: 'group',
    desc: ['Mengeluarkan member yang mengirim link group lain', '.antilink <on/off>'],
    group: true,
    admin: true,
    botAdmin: true,
    async handler(m, {conn, zx, args}){
        const {db} = require('../lib/database/database')
        const dbanti =  db.collection('groups')
        const anti = await dbanti.findOne({id: m.from})
        ready = m.command == 'antilink' ? args[0] == 'on' ? '*_Antilink sudah diaktifkan sebelumnya_*' : '*_Antilink belum diaktifkan diGroup ini_*' : m.command == 'antiviewonce' ? args[0] == 'on' ? '*_Antiviewonce sudah diaktifkan sebelumnya_*' : '*_Antiviewonce belum diaktifkan diGroup ini_*' : {} 
        if(anti == null){
            await dbanti.insertOne({
                id: m.from,
                name: zx.name,
                [m.command]: false
            })
        }
        if(args[0] == 'on'){
            anti2 = await dbanti.findOne({id: m.from})
            if(anti2 != null && anti2[m.command]) return m.reply(ready)
            await dbanti.updateOne({
                id: m.from
            }, {
                $set: {
                    [m.command]: true
                }
            })
            m.reply(`*_${m.command} Diaktifkan digroup ini_*`)
        }
        else if(args[0] == 'off'){
            if(anti == null || !anti[m.command]) return m.reply(ready)
            await dbanti.updateOne({
                id: m.from
            }, {
                $set: {
                    [m.command]: false
                }
            })
            m.reply(`*_${m.command} Dinonaktifkan digroup ini_*`)
        }
        else m.reply('Pilih on/off')
    }
}