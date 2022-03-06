const {wikisearch} = require('../lib/scraper')
module.exports = {
    name: ['wiki'].map((v) => v + ' <query>'),
    cmd: /^(wikipedia|wiki)$/i,
    category: 'search',
    desc: ['Mencari artikel di wikipedia', '.wiki <query>'],
    async handler(m, {conn, text}){
        try{
            if(!text) return m.reply('Mau cari apa di wiki?')
            await m.reply(global.mess.wait)
            wiki = await wikisearch(text)
            wikit = `*W I K I P E D I A*\n${global.shp} Query : ${text}\n\n${wiki[0].wiki}`
            await m.reply(wikit)
        }catch(e){
            global.error(global.command, e, m)
        }
    }
}