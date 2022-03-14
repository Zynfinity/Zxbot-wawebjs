const { chord } = require("../lib/scraper")
module.exports = {
    name: ['chord'].map((v) => v + ' <query>'),
    cmd: /^(chord)$/i,
    category: 'search',
    desc: ['Mencari chord lagu berdasarkan kata kunci', '.chord <query>'],
    async handler(m, {conn, text}){
        if(!text) return await conn.reply(m, 'Mau cari chord apa?')
        await conn.reply(m, global.mess.wait)
        try{
            chord(text).then(async res => {
                await conn.reply(m, res)
            })
        }catch(e){
            global.eror(global.command, e, m)
        }
    }
}