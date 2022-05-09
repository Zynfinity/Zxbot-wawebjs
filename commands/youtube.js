const { MessageMedia } = require('whatsapp-web.js')
const yts = require('yt-search')
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
            await m.reply(global.mess.wait)
            const down = await scrapp.youtube(m.command == 'ytmp3' ? 'mp3' : 'mp4', text)
            if(!down.status) return m.reply(down)
            if(down.link == undefined){
                const down2 = await scrapp.y1s(m.command == 'ytmp3' ? 'mp3' : 'mp4', text)
                if(!down2.status) return m.reply(down2)
                link2 = down2.dlink
            }
            teks = m.command == 'ytmp3' ? `*Y T M P 3  D O W N L O A D E R*\n\n` : `*Y T M P 4  D O W N L O A D E R*\n\n`
            teks += `${global.shp} Title : ${down.title}\n`
            teks += `${global.shp} Id : ${down.id}\n`
            teks += `${global.shp} Type : ${m.command == 'ytmp3' ? 'Mp3' : 'Mp4'}\n`
            teks += `${global.shp} Size : ${down.size}\n`
            if(!down.size.endsWith('KB') && down.size.split(' MB')[0] > 10){
                teks +=  `${global.shp} Download : ` + await tiny(down.mp3)
                teks += `\n\n${global.mess.oversize}`
                return conn.sendFileFromUrl(m.from, down.thumbnail, {caption: teks, quotedMessageId: msgId})
            }
            teks += `\nTunggu sebentar...\n${m.command == 'ytmp3' ? 'Audio' : 'Video'} sedang dikirim`
            const thumb = await MessageMedia.fromUrl(down.thumbnail)
            await conn.sendFileFromUrl(m.from, down.thumbnail, {ctwa: {type: 'yt', data: await conn.ctwa(down.title, m.command == 'ytmp3' ? `Y T M P 3  D O W N L O A D E R` : `Y T M P 4  D O W N L O A D E R`, thumb.data, down.url)}, caption: teks, quotedMessageId: msgId})
            await conn.sendFileFromUrl(m.from, down.link == undefined ? link2 : down.link, {quotedMessageId: msgId})
        }catch(e){
global.eror(m.command, e)
}
    }
}