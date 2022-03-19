const moment = require('moment-timezone')
const { sleep } = require('../lib/tools')
module.exports = {
    name: ['listpc', 'listgroup'].map((v) => v + ''),
    cmd: ['listpc','listgroup'],
    category: 'owner',
    desc: ['Menampilkan list chat', '.listpc/listgroup'],
    owner: true,
    async handler(m, {conn,  msgId}){
        chat = await conn.getChats()
        filchat = m.command == 'listpc' ? chat.filter(lst => !lst.isGroup) : chat.filter(lst => lst.isGroup && lst.groupMetadata.participants != '')
        list = m.command == 'listpc' ? `${global.shp} L I S T  P C\n\n` : `${global.shp} L I S T  G R O U P\n\n`
        num = 1
        mentions = []
        filchat.map(async res => {
            if(m.command == 'listpc'){
                list += `${num}\n`
                list += `├ *Number* : @${res.id._serialized.split('@')[0]} ${res.name.startsWith('+') ? '' : `${res.name}`}\n`
                list += `└ *Waktu* : ${moment(`${res.timestamp}` * 1000).tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm:ss')}\n\n`
                num += 1
                contact = await conn.getContactById(res.id._serialized)
                mentions.push(contact)
            }
            else{
            	admin = await res.groupMetadata.participants.filter(s => s.isAdmin)
                list += `${num}\n`
                list += `├ *Nama* : ${res.name} ${res.groupMetadata.announce ? '🔐' : ''}\n`
                list += `├ *Id* : ${res.groupMetadata.id._serialized}\n`
                list += `├ *Waktu Dibuat* : ${moment(`${res.groupMetadata.creation}` * 1000).tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm:ss')}\n`
                list += `├ *Jumlah Member* : ${res.groupMetadata.participants.length}\n`
                list += `├ *Jumlah Admin* : ${admin.length}\n\n`
                //list += `└ *Owner* : @${res.groupMetadata.owner.user}\n`
                num += 1
                contact = await conn.getContactById(res.groupMetadata.owner._serialized)
                mentions.push(contact)
            }
        })
        await sleep(3000)
        conn.sendMessage(m.from, list, {mentions: mentions, quotedMessageId: msgId})
    }
}