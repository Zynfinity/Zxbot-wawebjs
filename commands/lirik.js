const axios = require('axios')
module.exports = {
    name: ['lirik'].map((v) => v + ' <query>'),
    cmd: /^(lirik)$/i,
    category: 'search',
    desc: ['Mencari lirik lagu berdasarkan kata kunci', '.lirik <query>'],
    disabled: true,
    async handler(m, {conn, msgId, text}){
        if(!text) return await conn.reply(m, 'Mau cari lirik lagu apa?', msgId)
        await conn.reply(m, global.mess.wait, msgId)
        try{
            lir = await axios.get('https://some-random-api.ml/lyrics?title=' + text)
            lirik = '*L I R I K  L A G U*\n\n'
            lirik += `${global.shp} Judul : ${lir.data.title}\n`
            lirik += `${global.shp} Author : ${lir.data.author}\n\n${lir.data.lyrics}`
            await conn.sendFileFromUrl(m.from, lir.data.thumbnail.genius, {caption: lirik, quotedMessageId: msgId})
        }catch(e){
            global.eror(global.command, e, m)
        }
    }
}