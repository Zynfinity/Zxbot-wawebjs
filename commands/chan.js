const axios = require('axios')
module.exports = {
    name: ['zerochan', 'konachan'].map((v) => v + ' <query>'),
    cmd: ['zerochan', 'konachan'],
    category: 'search',
    desc: ['Mencari gambar dari web', '.@command <query>'],
    async handler(m, {conn, msgId, text}){
        try{
            if(!text) return m.reply('Mau cari apa?')
            await m.reply(mess.wait)
            const chan = m.command == 'konachan' ? await scrapp.konachan(text) : await scrapp.zerochan(text)
            if(!chan.status) return m.reply(chan)
            const rand = chan.result[Math.floor(Math.random() * chan.result.length)]
            await conn.sendFileFromUrl(m.from, rand, {ctwa: {type: 'link'}, quotedMessageId: msgId, caption: `Hasil dari pencarian ${text}`})
        }catch(e){
            global.eror(m.command, e, m)
        }
    }
}