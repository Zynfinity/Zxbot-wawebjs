const scrapp = require('../lib/scraper')
module.exports = {
    name: ['instagram'].map((v) => v + ' <link>'),
    cmd: ['igdl','instagram','ig'],
    category: 'downloader',
    desc: ['Mendownload media dari instagram', '.igdl <link>'],
    async handler(m, {conn,  msgId, text}){
        if(!text) return await m.reply('masukkan linknya!')
        if(!m.isUrl(text)) return await m.reply('Link tidak valid!')
        m.reply(global.mess.wait)
        scrapp.igdl(text).then(async res => {
            many = res.length > 1 ? true : false
            if(many) await m.reply('Jumlah media lebih dari 1, media akan dikirim lewat private chat (PC)\nSilahkan cek chat dari bot><!')
            res.map(s => {
                conn.sendFileFromUrl(many ? m.sender : m.from, s, {caption: '*Instagram Downloader*', quotedMessageId: msgId})
            })
        })
    }
}