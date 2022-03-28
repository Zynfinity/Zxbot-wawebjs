const axios = require('axios')
const zapi = require('zxy-api')
module.exports = {
    name: ['lirik'].map((v) => v + ' <query>'),
    cmd: ['lirik'],
    category: 'search',
    desc: ['Mencari lirik lagu berdasarkan kata kunci', '.lirik <query>'],
    async handler(m, {conn,  msgId, text}){
        if(!text) return await m.reply('Mau cari lirik lagu apa?')
        await m.reply(global.mess.wait)
        try{
            lir = await zapi.search.lirik(text)
            lirik = '*L I R I K  L A G U*\n\n'
            lirik += `${global.shp} Judul : ${lir.title}\n\n${lir.lyrics}`
            await m.reply(lirik)
        }catch(e){
            global.eror(m.command, e, m)
        }
    }
}