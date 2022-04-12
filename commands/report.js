const {owner} = require('../lib/config')
const {List} = require('whatsapp-web.js')
module.exports = {
    name: ['bugreport', 'report'].map((v) => v + ' <text>'),
    cmd: ['bugreport', 'report', 'reportacc', 'blockreport', 'refuseacc'],
    category: 'other',
    desc: ['Melaporkan bug kepada Owner', '.@command <text>'],
    async handler(m, {conn, zx, text, msgId}){
        if(m.command == 'reportacc'){
            lap = 'Laporan sudah diterima oleh Owner dan akan diproses\n\n'
            lap += `${global.shp} Detail Laporan\n`
            lap += m._data.quotedMsg.list.description
            split = m._data.listResponse.description.split('|')
            m.reply('done')
            return conn.sendMessage(split[1], lap, {quotedMessageId: split[0], mentions: [await conn.getContactById(split[2])]})
        }
        else if(m.command == 'blockreport'){
            lap = 'Laporan ditolak, anda akan diblock oleh bot\n\n'
            lap += `${global.shp} Detail Laporan\n`
            lap += m._data.quotedMsg.list.description
            split = m._data.listResponse.description.split('|')
            con = await conn.getContactById(split[2])
            con.block()
            m.reply('done')
            return conn.sendMessage(split[1], lap, {quotedMessageId: split[0], mentions: [con]})
        }
        else if(m.command == 'refuseacc'){
            lap = 'Laporan ditolak\n\n'
            lap += `${global.shp} Detail Laporan\n`
            lap += m._data.quotedMsg.list.description
            split = m._data.listResponse.description.split('|')
            m.reply('done')
            return conn.sendMessage(split[1], lap, {quotedMessageId: split[0], mentions: [await conn.getContactById(split[2])]})
        }
        if(!text) return m.reply('Mau laporin apa?')
        report = `├ Group : ${zx.name}\n`
        report += `├ User : ${m._data.notifyName} [@${m.sender.split('@')[0]}]\n`
        report += `├ Info : ${text}\n${global.shp}`
        row = [{
            id: '.blockreport',
            title: 'Block User',
            description: msgId + '|' + m.from + '|' + m.sender
        },{
            id: '.reportacc',
            title: 'Terima',
            description: msgId + '|' + m.from + '|' + m.sender
        },{
            id: '.refuseacc',
            title: 'Tolak',
            description: msgId + '|' + m.from + '|' + m.sender
        }]
        section = [{'title':'sectionTitle','rows':row}]
        list = await new List(report, 'Click Here', section, `${global.shp} *BUG REPORT*\n`)
        con = await conn.getContactById(m.sender)
        await conn.sendMessage(owner, list, {mentions: [con], quotedMessageId: msgId})
        //await conn.mentions(owner, report, {quotedMessageId: msgId})
        await m.reply('Laporan sudah disampaikan kepada Owner')
    }
}