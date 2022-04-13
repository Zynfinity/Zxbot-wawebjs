const { formatRupiah } = require('../lib/tools')

module.exports = {
    name: ['transfer'].map((v) => v + ' <tag nominal>'),
    cmd: ['transfer', 'tf'],
    category: 'bank',
    desc: ['Mentransfer balance yang anda miliki', '.transfer @0 2000'],
    async handler(m, {conn, msgId, args, text, mentionedIds}){
        const {db} = require('../lib/database/database')
        const users = await db.collection('users')
        if(!text) return m.reply('Usage : .transfer tag nominal\nExample : .transfer @0 2000')
        if(!args[0].startsWith('@')) return m.reply('Format salah\nExample : .transfer @0 2000')
        if(mentionedIds == '') return m.reply('Format salah\nExample : .transfer @0 2000')
        if(isNaN(args[1])) return m.reply('Nominal harus berupa angka!\nExample : .transfer @0 2000')
        const user = await users.findOne({id: mentionedIds[0]})
        const sender = await users.findOne({id: m.sender})
        if(user == null) return m.reply('User tidak terdaftar didatabase!\nPastikan orang yang kamu tag pernah memainkan bot!')
        if(sender.balance == 0) return m.reply('Kamu tidak mempunyai balance!')
        if(sender.balance <= Number(args[1])) return m.reply(`Balance anda tidak mencukupi untuk transfer sebesar ${await formatRupiah(args[1], '.')}\nBalance kamu tersisa ${await formatRupiah(sender.balance, '.')}`)
        await users.updateOne({
            id: mentionedIds[0]
        }, {
            $set: {
                balance: user.balance + Number(args[1])
            }
        })
        await users.updateOne({
            id: m.sender
        }, {
            $set: {
                balance: sender.balance - Number(args[1])
            }
        })
        tf = `*TRANSFER*\n\n`
        tf += `${global.shp} Status : Succsess\n`
        tf += `${global.shp} Pengirim : @${m.sender.split('@')[0]}\n`
        tf += `${global.shp} Penerima : @${mentionedIds[0].split('@')[0]}\n`
        tf += `${global.shp} Jumlah : ${await formatRupiah(args[1], '.')}`
        await conn.mentions(m.from, tf, {quotedMessageId: msgId})
    }
} 