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
            data = await scrapp.musicaldown(text)
            if(!data.status) return m.reply(data)
            if(m.command == 'tiktokmusic' || m.command == 'tiktokmp3'){
                return await conn.sendFileFromUrl(m.from, data.audio.link3 == undefined ? data.video.link1 : data.audio.link3, {ctwa: {type: 'link'},quotedMessageId: msgId}, {mimetype: 'audio/mpeg'})
            }
            tx = 'Done'
            await conn.sendFileFromUrl(m.from, data.video.link1, {ctwa: {type: 'link'},caption: tx, quotedMessageId: msgId}, {mimetype: 'video/mp4'})
        }catch(e){
            try{
                data = await scrapp.tikdown(text)
                if(!data.status) return m.reply(data)
                await conn.sendFileFromUrl(m.from, m.command == 'tiktokmusic' || m.command == 'tiktokmp3' ? data.audio : data.video, {ctwa: {type: 'link'},quotedMessageId: msgId})
            }catch(p){
                global.eror(m.command, p, m)
            }
        }
    }
    
}