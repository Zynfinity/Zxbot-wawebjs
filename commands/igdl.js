const scrap = require('../lib/scraper')
module.exports = {
    name: ['igdl'].map((v) => v + ' <link instagram>'),
    cmd: /^(igdl|instagram)$/i,
    category: 'downloader',
    desc: ['Mendownload media dari instagram', '.igdl <link instagram>'],
    async handler(m, {conn, text}){
        if(!text) return m.reply('masukkan linknya!')
        if(!m.isUrl(text)) return m.reply('Link tidak valid!')
        scrap.igdl(text).then(async res => {
            res.map(s => {
                conn.sendFileFromUrl(m.from, s, 'igdl', '*Instagram Downloader*', m.id)
            })
        })
    }
}