const scrap = require('../lib/scraper')
module.exports = {
    name: ['tiktok'].map((v) => v + ' <link tiktok>'),
    cmd: /^(tiktok|tiktoknowm)$/i,
    category: 'downloader',
    desc: ['Mendownload video dari tiktok', '.tiktok <link> <WithWatermark>/.tiktoknowm <link> <NoWatermark>'],
    async handler(m, {conn, text, command}){
        if(!text) return m.reply('Masukkan linknya!')
        if(!m.isUrl(text)) return m.reply('Link tidak valid')
        m.reply(global.mess.wait)
        try{
            data = await scrap.ggtiktok(text)
            conn.sendFileFromUrl(m.from, data.data.videoWM, 'tiktok', '*Tiktok Downloader*', m.id)
        }catch{
            m.reply(global.mess.error)
        }
    }
    
}