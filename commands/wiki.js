const {wikisearch} = require('../lib/scraper')
module.exports = {
    name: ['wiki'].map((v) => v + ' <query>'),
    cmd: /^(wikipedia|wiki)$/i,
    category: 'search',
    desc: ['Mencari artikel di wikipedia', '.wiki <query>'],
    async handler(m, {conn, msgId, text}){
        try{
            if(!text) return await conn.reply(m, 'Mau cari apa di wiki?', msgId)
            await conn.reply(m, global.mess.wait, msgId)
            wiki = await wikisearch(text)
            if(!wiki[0].wiki) return await conn.reply(m, `${text} tidak ditemukan di wikipedia`, msgId)
            wikit = `${global.shp} W I K I P E D I A\n└ Query : ${text}\n\n${wiki[0].wiki}`
            await conn.reply(m, wikit, msgId)
        }catch(e){
            global.eror(global.command, e, m)
        }
    }
}