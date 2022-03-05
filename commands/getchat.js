const moment = require('moment-timezone')
const { sleep } = require('../lib/tools')
module.exports = {
    name: ['listpc', 'listgroup'].map((v) => v + ''),
    cmd: /^(listpc|listgroup)$/i,
    category: 'owner',
    desc: ['Menampilkan list chat', '.listpc/listgroup'],
    owner: true,
    async handler(m, {conn}){
        chat = await conn.getChats()
        filchat = command == 'listpc' ? chat.filter(lst => !lst.isGroup) : chat.filter(lst => lst.isGroup)
        list = command == 'listpc' ? '*L I S T  P C*\n\n' : '*L I S T  G R O U P*\n\n'
        num = 1
        mentions = []
        filchat.map(async res => {
            if(command == 'listpc'){
                list += `*${num}.* @${res.id._serialized.split('@')[0]} ${res.name.startsWith('+') ? '' : `${res.name}`}\n`
                list += `┗━ ${global.shp} Waktu : ${moment(`${res.timestamp}` * 1000).tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm:ss')}\n\n`
                num += 1
                contact = await conn.getContactById(res.id._serialized)
                mentions.push(contact)
            }
            else{
                list += `*${num}.* ${res.name} ${res.groupMetadata.announce ? '🔐' : ''}\n`
                list += `┗━ ${global.shp} Waktu : ${moment(`${res.timestamp}` * 1000).tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm:ss')}\n\n`
                num += 1
            }
        })
        await sleep(3000)
        conn.sendMessage(m.from, list, {mentions: mentions, quotedMessageId: m.msgId})
    }
}