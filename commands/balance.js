const { formatRupiah } = require('../lib/tools')

module.exports = {
    name: ['mybank'].map((v) => v),
    cmd: ['mybank'],
    category: 'bank',
    desc: ['Mengecek saku yang anda miliki'],
    async handler(m, {conn}){
        const {db} = require('../lib/database/database')
        const userdb = db.collection('users')
        users = await userdb.findOne({id: m.sender})
        bank = `${global.shp} *BANK INFO*\n`
        bank += `├ Id: ${users.id}\n`
        bank += `├ Balance: ${await formatRupiah(String(users.balance), '.')}\n`
        bank += `├ Limit: ${users.limit}\n`
        bank += '└ '
        m.reply(bank)
    }
}