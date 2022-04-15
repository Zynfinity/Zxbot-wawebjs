const fs = require('fs')
module.exports = {
    name: ['mute', 'unmute'],
    cmd: ['mute', ,'unmute'],
    category: 'group',
    desc: ['Mengaktifkan/Menonaktifkan bot di Group', '.@command'],
    group: true,
    admin: true,
    async handler(m, {conn}){
        data = JSON.parse(fs.readFileSync('./lib/json/data.json'))
        if(m.command == 'mute'){
            if(data.mute.includes(m.from)) return m.reply('Bot Telah Dimute Sebelumnya')
            data.mute.push(m.from)
            await fs.writeFileSync('./lib/json/data.json', JSON.stringify(data))
            m.reply('Bot Berhasil dimute diGroup ini')
        }else{
            if(!data.mute.includes(m.from)) return m.reply('Bot Telah Diunmute Sebelumnya')
            index = data.mute.indexOf(m.from)
            data.mute.splice(index, 1)
            await fs.writeFileSync('./lib/json/data.json', JSON.stringify(data))
            m.reply('Bot Berhasil diunmute diGroup ini')
        }
    }
}