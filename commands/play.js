const yts = require('yt-search')
const { tiny } = require('../lib/tools')
module.exports = {
    name: ['play', 'video'].map((v) => v + ' <query>'),
    cmd: ['play','video'],
    category: 'downloader',
    desc: ['Mendownload video/audio dari youtube berdasarkan kata kunci!', '.play <query>'],
    //disabled: true,
    async handler(m, {conn, msgId, text}){
        try{
            if(!text) return await m.reply('Kata kuncinya mana?')
            m.reply(global.mess.wait)
            cari = await yts(text)
            filt = cari.all.filter(res => res.type == 'video' && res.url)[0]
            down = await scrapp.youtube(filt.url)
            if(!down.status) return m.reply(down)
            teks = m.command == 'play' ? `P L A Y  M U S I C\n\n` : `P L A Y  V I D E O\n\n`
            teks += `${global.shp} Title : ${filt.title}\n`
            teks += `${global.shp} Author : ${filt.author.name}\n`
            teks += `${global.shp} Duration : ${filt.timestamp}\n`
            teks += `${global.shp} Upload Date : ${filt.ago == undefined ? '-' : filt.ago}\n`
            teks += `${global.shp} Type : ${m.command == 'play' ? 'Mp3' : 'Mp4'}\n`
            teks += `${global.shp} Size : ${m.command == 'play' ? down.size_mp3 : down.size}\n`
            if(m.command == 'play' ? !down.size_mp3.endsWith('KB') && Number(down.size_mp3.split(' MB')[0]) > 10 : !down.size.endsWith('KB') && down.size.split(' MB')[0] > 10){
                teks += m.command == 'play' ? `${global.shp} Download : ` + await tiny(down.mp3) : `${global.shp} Download : ` + await tiny(down.link) + '\n\n'
                teks += `\n\n${global.mess.oversize}`
                return conn.sendFileFromUrl(m.from, filt.thumbnail, {caption: teks, quotedMessageId: msgId})
            }
            teks += `\nTunggu sebentar...\n${m.command == 'play' ? 'Audio' : 'Video'} sedang dikirim`
            await conn.sendFileFromUrl(m.from, filt.thumbnail, {caption: teks, quotedMessageId: msgId})
            mim = m.command == 'play' ? 'audio/mpeg' : 'video/mp4'
            await conn.sendFileFromUrl(m.from, m.command == 'play' ? down.mp3 : down.link, {quotedMessageId: msgId}, {mimetype: mim})
        }catch(e){
            global.eror(m.command, e, m)
        }
    }
}