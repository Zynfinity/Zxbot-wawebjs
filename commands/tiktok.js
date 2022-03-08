const { musicaldown } = require("../lib/scraper")
module.exports = {
    name: ['tiktok', 'tiktokmp3'].map((v) => v + ' <link>'),
    cmd: /^(tiktok|tiktoknowm|tiktokmusic|tiktokmp3)$/i,
    category: 'downloader',
    desc: ['Mendownload video dari tiktok', '.tiktok <link> <WithWatermark>/.tiktoknowm <link> <NoWatermark>'],
    async handler(m, {conn, text, command}){
        if(!text) return m.reply('Masukkan linknya!')
        if(!m.isUrl(text)) return m.reply('Link tidak valid')
        m.reply(global.mess.wait)
        try{
            data = await musicaldown(text)
            if(command == 'tiktokmusic' || command == 'tiktokmp3'){
                console.log(data.audio.link3)
                return await conn.sendFileFromUrl(m.from, data.audio.link3 == undefined ? data.video.link1 : data.audio.link3, {quotedMessageId: m.msgId}, {mimetype: 'audio/mpeg'})
            }
            tx = '*T I K T O K  D O W N L O A D E R*'
            await conn.sendFileFromUrl(m.from, data.video.link1, {caption: tx, quotedMessageId: m.msgId}, {mimetype: 'video/mp4'})
        }catch(e){
            global.eror(global.command, e, m)
        }
    }
    
}