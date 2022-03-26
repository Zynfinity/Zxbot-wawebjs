const yts = require('yt-search')
const {youtube} = require('../lib/scraper')
const { tiny } = require('../lib/tools')
module.exports = {
    name: ['ytmp3', 'ytmp4'].map((v) => v + ' <link>'),
    cmd: ['ytmp3','ytmp4'],
    category: 'downloader',
    desc: ['Mendownload video/audio dari youtube berdasarkan url!', '.ytmp3/ytmp4 <link>'],
    async handler(m, {conn, msgId, text}){
        try{
            if(!text) return await m.reply('Masukkan link!')
            if(!m.isUrl(text)) return await m.reply(global.mess.errorlink)
            m.reply(global.mess.wait)
            down = await youtube(text)
            teks = m.command == 'ytmp3' ? `*Y T M P 3  D O W N L O A D E R*\n\n` : `*Y T M P 4  D O W N L O A D E R*\n\n`
            teks += `${global.shp} Title : ${down.title}\n`
            teks += `${global.shp} Id : ${down.id}\n`
            teks += `${global.shp} Type : ${m.command == 'ytmp3' ? 'Mp3' : 'Mp4'}\n`
            teks += `${global.shp} Size : ${m.command == 'ytmp3' ? down.size_mp3 : down.size}\n`
            if(m.command == 'ytmp3' ? !down.size_mp3.endsWith('KB') && down.size_mp3.split(' MB')[0] > 50 : !down.size.endsWith('KB') && down.size.split(' MB')[0] > 10){
                teks += m.command == 'ytmp3' ? `${global.shp} Download : ` + await tiny(down.mp3) : `${global.shp} Download : ` + await tiny(down.link) + '\n\n'
                teks += `\n\n${global.mess.oversize}`
                return conn.sendFileFromUrl(m.from, down.thumbnail, {caption: teks, quotedMessageId: msgId})
            }
            teks += `\nTunggu sebentar...\n${m.command == 'ytmp3' ? 'Audio' : 'Video'} sedang dikirim`
            await conn.sendFileFromUrl(m.from, down.thumbnail, {caption: teks, quotedMessageId: msgId})
            conn.sendFileFromUrl(m.from, m.command == 'ytmp3' ? down.mp3 : down.link, {quotedMessageId: msgId})
        }catch(e){
global.eror(m.command, e)
}
    }
}