const {pinterest} = require('../lib/scraper')
module.exports = {
    name: ['pinterest'].map((v) => v + ' <query>'),
    cmd: /^(pinterest)$/i,
    category: 'search',
    desc: ['Mencari gambar di pinterest', '.pinterest <query>'],
    async handler(m, {conn, text}){
        try{
            if(!text) return conn.reply(m, 'Mau cari apa di pinterest?')
            await conn.reply(m, global.mess.wait)
            res = await pinterest(text)
            image = res[Math.floor(Math.random() * res.length)]
            await conn.sendFileFromUrl(m.from, image, {caption: `*Hasil Pencarian : ${text}*`, quotedMessageId: m.msgId})
        }catch(e){
            global.eror(global.command, e, m)
        }
    }
}