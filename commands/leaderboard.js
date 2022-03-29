const { formatRupiah } = require('../lib/tools')
module.exports = {
    name: ['leaderboard'].map((v) => v),
    cmd: ['leaderboard'],
    category: 'bank',
    async handler(m, {conn}){
        const db = require('../lib/database/database')
        users = await db.showdata('users')
        lead = `${global.shp} *LEADERBOARD*\n`
        urut = await users.sort(function (a, b) {
            return b.balance - a.balance
        })
        for(let i=0; i<15; i++){
            con = await conn.getContactById(urut[i].id)
            lead += `├ Position : ${i + 1}\n`
            lead += `├ Name : ${con.pushname ? con.pushname : '-'}\n`
            lead += `├ Id : ${urut[i].id}\n`
            lead += `├ Balance : ${await formatRupiah(String(urut[i].balance), '.')}\n`
            lead += '└\n\n'
        }
        m.reply(lead)
    }
}