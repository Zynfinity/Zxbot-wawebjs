const moment = require("moment-timezone");
module.exports = {
    name: ['sider'].map((v) => v + ' <reply pesan bot>'),
    cmd: /^(sider)$/i,
    category: 'group',
    desc: ['Untuk melihat orang yang sudah membaca pesan bot', '.sider <reply pesan bot>'],
    admin: true,
    async handler(m, {conn, quotedMsg}){
        if(!quotedMsg) return m.reply('reply pesan dari bot')
        if(quotedMsg.sender.id != (await conn.getMe()).me._serialized) return m.reply('reply pesan dari bot!')
        data = await conn.getMessageReaders(quotedMsg.id)
        teks = `⬣ Telah dibaca oleh\n\n`
        data.map(res => {
            teks += global.shp + ' ' + res.pushname + '\n'
			teks += global.shp + ' ' + '@' + res.id.split('@')[0] + '\n'
			teks += `┗━ ${global.shp} Waktu : ` + moment(`${res.t}` * 1000).tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm:ss') + '\n'
        })
        m.reply(teks)
    }
}