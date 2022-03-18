const { chord } = require("../lib/scraper")
module.exports = {
    name: ['chord'].map((v) => v + ' <query>'),
    cmd: /^(chord)$/i,
    category: 'search',
    desc: ['Mencari chord lagu berdasarkan kata kunci', '.chord <query>'],
    async handler(m, {conn, msgId, text}){
        if(!text) return await conn.reply(m, 'Mau cari chord apa?', msgId)
        await conn.reply(m, global.mess.wait, msgId)
        try{
            chord(text).then(async res => {
                await conn.reply(m, res, msgId)
            })
        }catch(e){
            global.eror(global.command, e, m)
        }
    }
}