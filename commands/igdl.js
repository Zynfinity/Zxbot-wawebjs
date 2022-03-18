const scrap = require('../lib/scraper')
module.exports = {
    name: ['instagram'].map((v) => v + ' <link>'),
    cmd: /^(igdl|instagram|ig)$/i,
    category: 'downloader',
    desc: ['Mendownload media dari instagram', '.igdl <link>'],
    async handler(m, {conn, msgId, text}){
        if(!text) return await conn.reply(m, 'masukkan linknya!', msgId)
        if(!m.isUrl(text)) return await conn.reply(m, 'Link tidak valid!', msgId)
        conn.reply(m, global.mess.wait, msgId)
        scrap.igdl(text).then(async res => {
            res.map(s => {
                conn.sendFileFromUrl(m.from, s, {caption: '*Instagram Downloader*', quotedMessageId: msgId})
            })
        })
    }
}