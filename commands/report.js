const {owner} = require('../lib/config')
module.exports = {
    name: ['bugreport', 'report'].map((v) => v + ' <text>'),
    cmd: ['bugreport', 'report'],
    category: 'other',
    desc: ['Melaporkan bug kepada Owner', '.@command <text>'],
    async handler(m, {conn, zx, text, msgId}){
        if(!text) return m.reply('Mau laporin apa?')
        report = `${global.shp} *BUG REPORT*\n`
        report += `├ Group : ${zx.name}\n`
        report += `├ User : ${m._data.notifyName} [@${m.sender.split('@')[0]}]\n`
        report += `├ Info : ${text}\n${global.shp}`
        await conn.mentions(owner, report, {quotedMessageId: msgId})
        await m.reply('Laporan sudah disampaikan kepada Owner')
    }
}