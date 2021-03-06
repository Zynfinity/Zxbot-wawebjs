const {pinterest} = require('../lib/scraper')
module.exports = {
    name: ['pinterest'].map((v) => v + ' <query>'),
    cmd: ['pinterest'],
    category: 'search',
    desc: ['Mencari gambar di pinterest', '.pinterest <query>'],
    async handler(m, {conn,  msgId, text}){
        try{
            if(!text) return await m.reply('Mau cari apa di pinterest?')
            await m.reply(global.mess.wait)
            const res = await pinterest(text)
if(res == '') return m.reply('Gambar tidak ditemukan')
            const image = res[Math.floor(Math.random() * res.length)]
            await conn.sendFileFromUrl(m.from, image, {ctwa: {type: 'link'}, caption: `*Hasil Pencarian : ${text}*`, quotedMessageId: msgId})
        }catch(e){
            global.eror(m.command, e, m)
        }
    }
}