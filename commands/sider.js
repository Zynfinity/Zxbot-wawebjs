const moment = require("moment-timezone");
module.exports = {
    name: ['sider'].map((v) => v + ' <reply pesan bot>'),
    cmd: ['sider'],
    category: 'group',
    desc: ['Untuk melihat orang yang sudah membaca pesan bot', '.sider <reply pesan bot>'],
    admin: true,
    disabled: true,
    async handler(m, {conn,  msgId, quotedMsg, botNumber}){
        if(!quotedMsg) return await m.reply('reply pesan dari bot')
        if(quotedMsg.sender != botNumber) return await m.reply('reply pesan dari bot!')
        quot = await m.getQuotedMessage()
        data = await quot.getInfo()
        teks = `⬣ Telah dibaca oleh\n\n`
        data.read.map(res => {
			teks += global.shp + ' ' + '@' + res.id.split('@')[0] + '\n'
			teks += `┗━ ${global.shp} Waktu : ` + moment(`${res.t}` * 1000).tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm:ss') + '\n'
        })
        m.reply(teks)
    }
}