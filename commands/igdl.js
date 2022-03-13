const scrap = require('../lib/scraper')
module.exports = {
    name: ['instagram'].map((v) => v + ' <link>'),
    cmd: /^(igdl|instagram|ig)$/i,
    category: 'downloader',
    desc: ['Mendownload media dari instagram', '.igdl <link>'],
    async handler(m, {conn, text}){
        if(!text) return conn.reply(m, 'masukkan linknya!')
        if(!m.isUrl(text)) return conn.reply(m, 'Link tidak valid!')
        conn.reply(m, global.mess.wait)
        scrap.igdl(text).then(async res => {
            res.map(s => {
                conn.sendFileFromUrl(m.from, s, {caption: '*Instagram Downloader*', quotedMessageId: m.msgId})
            })
        })
    }
}