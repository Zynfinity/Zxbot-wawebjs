const scrap = require('../lib/scraper')
module.exports = {
    name: ['instagram'].map((v) => v + ' <link>'),
    cmd: ['igdl','instagram','ig'],
    category: 'downloader',
    desc: ['Mendownload media dari instagram', '.igdl <link>'],
    async handler(m, {conn,  msgId, text}){
        if(!text) return await m.reply('masukkan linknya!')
        if(!m.isUrl(text)) return await m.reply('Link tidak valid!')
        m.reply(global.mess.wait)
        scrap.igdl(text).then(async res => {
            res.map(s => {
                conn.sendFileFromUrl(m.from, s, {caption: '*Instagram Downloader*', quotedMessageId: msgId})
            })
        })
    }
}