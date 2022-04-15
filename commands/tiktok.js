const { musicaldown, tikdown } = require("../lib/scraper")
module.exports = {
    name: ['tiktok', 'tiktokmp3'].map((v) => v + ' <link>'),
    cmd: ['tiktok','tiktoknowm','tiktokmusic','tiktokmp3'],
    category: 'downloader',
    desc: ['Mendownload video dari tiktok', '.tiktok <link> <WithWatermark>/.tiktoknowm <link> <NoWatermark>'],
    async handler(m, {conn,  msgId, text}){
        if(!text) return await m.reply('Masukkan linknya!')
        if(!m.isUrl(text)) return await m.reply('Link tidak valid')
        m.reply(global.mess.wait)
        try{
            data = await musicaldown(text)
            if(m.command == 'tiktokmusic' || m.command == 'tiktokmp3'){
                return await conn.sendFileFromUrl(m.from, data.audio.link3 == undefined ? data.video.link1 : data.audio.link3, {quotedMessageId: msgId}, {mimetype: 'audio/mpeg'})
            }
            tx = '*T I K T O K  D O W N L O A D E R*'
            await conn.sendFileFromUrl(m.from, data.video.link1, {caption: tx, quotedMessageId: msgId}, {mimetype: 'video/mp4'})
        }catch(e){
            try{
                data = await tikdown(text)
                if(data.status){
                    await conn.sendFileFromUrl(m.from, m.command == 'tiktokmusic' || m.command == 'tiktokmp3' ? data.audio : data.video, {quotedMessageId: msgId})
                }
            }catch(p){
                global.eror(m.command, p, m)
            }
        }
    }
    
}