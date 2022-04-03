module.exports = {
    name: ['antilink'].map((v) => v + ' <on/off>'),
    cmd: ['antilink'],
    category: 'group',
    desc: ['Mengeluarkan member yang mengirim link group lain', '.antilink <on/off>'],
    group: true,
    admin: true,
    botAdmin: true,
    async handler(m, {conn, zx, args}){
        const {db} = require('../lib/database/database')
        const dbanti =  db.collection('groups')
        const anti = await dbanti.findOne({id: m.from})
        if(anti == null){
            await dbanti.insertOne({
                id: m.from,
                name: zx.name,
                antilink: false
            })
        }
        if(args[0] == 'on'){
            anti2 = await dbanti.findOne({id: m.from})
            if(anti2 != null && anti2.antilink) return m.reply('*_Antilink sudah diaktifkan sebelumnya_*')
            await dbanti.updateOne({
                id: m.from
            }, {
                $set: {
                    antilink: true
                }
            })
            m.reply('*_Antilink Diaktifkan digroup ini_*')
        }
        else if(args[0] == 'off'){
            if(anti == null || !anti.antilink) return m.reply('*_Antilink belum diaktifkan diGroup ini_*')
            await dbanti.updateOne({
                id: m.from
            }, {
                $set: {
                    antilink: false
                }
            })
            m.reply('*_Antilink Dinonaktifkan digroup ini_*')
        }
        else m.reply('Pilih on/off')
    }
}