const gis = require('g-i-s')
module.exports = {
    name: ['image'].map((v) => v + ' <query>'),
    cmd: ['image'],
    category: 'search',
    disabled: true,
    desc: ['Mencari gambar di google', '.image <query>'],
    async handler(m, {conn,  msgId, text}){
        try{
            if(!text) return await m.reply('Mau cari apa di pinterest?')
            await m.reply(global.mess.wait)
            const result = await gis(text)
                images = result[Math.floor(Math.random() * result.length)].url
                await conn.sendFileFromUrl(m.from, images, {ctwa: {type: 'link'}, caption: '*Hasil Pencarian* : ' + text, quotedMessageId: msgId})
        }catch(e){
            global.eror(m.command, e, m)
        }
    }
}