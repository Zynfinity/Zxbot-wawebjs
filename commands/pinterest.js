const {pinterest} = require('../lib/scraper')
module.exports = {
    name: ['pinterest'].map((v) => v + ' <query>'),
    cmd: /^(pinterest)$/i,
    category: 'search',
    desc: ['Mencari gambar di pinterest', '.pinterest <query>'],
    async handler(m, {conn, text}){
        try{
            if(!text) return m.reply('Mau cari apa di pinterest?')
            await m.reply(global.mess.wait)
            res = await pinterest(text)
            image = res[Math.floor(Math.random() * res.length)]
            await conn.sendFileFromUrl(m.from, image, {caption: `*Hasil Pencarian : ${text}*`, quotedMessageId: m.msgId})
        }catch(e){
            global.error(global.command, e, m)
        }
    }
}