const { chord } = require("../lib/scraper")
module.exports = {
    name: ['chord'].map((v) => v + ' <query>'),
    cmd: /^(chord)$/i,
    category: 'search',
    desc: ['Mencari chord lagu berdasarkan kata kunci', '.chord <query>'],
    async handler(m, {conn, text}){
        if(!text) return m.reply('Mau cari chord apa?')
        await m.reply(global.mess.wait)
        try{
            chord(text).then(async res => {
                await m.reply(res)
            })
        }catch(e){
            global.eror(global.command, e, m)
        }
    }
}