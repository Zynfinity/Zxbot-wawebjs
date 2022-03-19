const {wikisearch} = require('../lib/scraper')
module.exports = {
    name: ['wiki'].map((v) => v + ' <query>'),
    cmd: ['wikipedia','wiki'],
    category: 'search',
    desc: ['Mencari artikel di wikipedia', '.wiki <query>'],
    async handler(m, {conn,  msgId, text}){
        try{
            if(!text) return await m.reply('Mau cari apa di wiki?')
            await m.reply(global.mess.wait)
            wiki = await wikisearch(text)
            if(!wiki[0].wiki) return await m.reply(`${text} tidak ditemukan di wikipedia`)
            wikit = `${global.shp} W I K I P E D I A\n└ Query : ${text}\n\n${wiki[0].wiki}`
            await m.reply(wikit)
        }catch(e){
            global.eror(m.m.command, e, m)
        }
    }
}