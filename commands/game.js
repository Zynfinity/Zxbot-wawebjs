module.exports = {
    name: ['game'].map((v) => v),
    cmd: ['game'],
    category: 'group',
    desc: ['Mengaktifkan mode game di group'],
    group: true,
    admin: true,
    async handler(m, {conn, zx, args}){
        const {db} = require('../lib/database/database')
        const game = await db.collection('groups')
        find = await game.findOne({id: m.from})
        if(find == null){
            await game.insertOne({
                id: m.from,
                name: zx.name,
                game: true
            })
        }
        if(args[0] == 'on'){
            anti2 = await game.findOne({id: m.from})
            if(anti2 != null && anti2[m.command]) return m.reply('Game Mode sudah diaktifkan sebelumnya!')
            await game.updateOne({
                id: m.from
            }, {
                $set: {
                    [m.command]: true
                }
            })
            m.reply(`*_Game Mode Diaktifkan digroup ini_*\n\n_Note : Antispam Group otomatis aktif dengan waktu 3 detik_`)
        }
        else if(args[0] == 'off'){
            if(find == null || !find[m.command]) return m.reply('Game mode tidak diaktifkan sebelumnya!')
            await game.updateOne({
                id: m.from
            }, {
                $set: {
                    [m.command]: false
                }
            })
            m.reply(`*_Game Mode Dinonaktifkan digroup ini_*`)
        }
        else m.reply('pilih on/off')
    }
}