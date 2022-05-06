const fs = require('fs')
module.exports = {
    name: ['mute', 'unmute'],
    cmd: ['mute', ,'unmute'],
    category: 'group',
    desc: ['Mengaktifkan/Menonaktifkan bot di Group', '.@command'],
    group: true,
    admin: true,
    async handler(m, {conn}){
        mute = JSON.parse(fs.readFileSync('./lib/json/mute.json'))
        if(m.command == 'mute'){
            if(mute.includes(m.from)) return m.reply('Bot Telah Dimute Sebelumnya')
            mute.push(m.from)
            await fs.writeFileSync('./lib/json/mute.json', JSON.stringify(mute))
            m.reply('Bot Berhasil dimute diGroup ini')
        }else{
            if(!mute.includes(m.from)) return m.reply('Bot Telah Diunmute Sebelumnya')
            index = mute.indexOf(m.from)
            mute.splice(index, 1)
            await fs.writeFileSync('./lib/json/mute.json', JSON.stringify(mute))
            m.reply('Bot Berhasil diunmute diGroup ini')
        }
    }
}