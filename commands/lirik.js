const lyrics = require('music-lyrics')
module.exports = {
    name: ['lirik'].map((v) => v + ' <query>'),
    cmd: ['lirik'],
    category: 'search',
    desc: ['Mencari lirik lagu berdasarkan kata kunci', '.lirik <query>'],
    async handler(m, {conn,  msgId, text}){
        if(!text) return await m.reply('Mau cari lirik lagu apa?')
        await m.reply(global.mess.wait)
        try{
            lir = await lyrics.search(text)
            await m.reply(lir)
        }catch(e){
            m.reply('Lirik tidak ditemukan')
            //global.eror(m.command, e, m)
        }
    }
}