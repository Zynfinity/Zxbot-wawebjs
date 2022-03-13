const {wikisearch} = require('../lib/scraper')
module.exports = {
    name: ['wiki'].map((v) => v + ' <query>'),
    cmd: /^(wikipedia|wiki)$/i,
    category: 'search',
    desc: ['Mencari artikel di wikipedia', '.wiki <query>'],
    async handler(m, {conn, text}){
        try{
            if(!text) return conn.reply(m, 'Mau cari apa di wiki?')
            await conn.reply(m, global.mess.wait)
            wiki = await wikisearch(text)
            if(!wiki[0].wiki) return conn.reply(m, `${text} tidak ditemukan di wikipedia`)
            wikit = `${global.shp} W I K I P E D I A\n└ Query : ${text}\n\n${wiki[0].wiki}`
            await conn.reply(m, wikit)
        }catch(e){
            global.eror(global.command, e, m)
        }
    }
}