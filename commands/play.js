const { MessageMedia } = require('whatsapp-web.js')
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
            isdoc = text.includes('-d') ? true : false
            m.reply(global.mess.wait)
            const cari = await yts(isdoc ? text.replace('-d', '') : text)
            const filt = cari.all.filter(res => res.type == 'video' && res.url)[0]
            down = await scrapp.youtube(m.command == 'play' ? 'mp3' : 'mp4', filt.url)
            if(down.link == undefined){
                const down2 = await scrapp.y1s(m.command == 'play' ? 'mp3' : 'mp4', filt.url)
                if(!down2.status) return m.reply(down2)
                link2 = down2.dlink
            }
            if(!down.status) return m.reply(down)
            teks = m.command == 'play' ? `P L A Y  M U S I C\n\n` : `P L A Y  V I D E O\n\n`
            teks += `${global.shp} Title : ${filt.title}\n`
            teks += `${global.shp} Author : ${filt.author.name}\n`
            teks += `${global.shp} Duration : ${filt.timestamp}\n`
            teks += `${global.shp} Upload Date : ${filt.ago == undefined ? '-' : filt.ago}\n`
            teks += `${global.shp} Type : ${m.command == 'play' ? 'Mp3' : 'Mp4'}\n`
            teks += `${global.shp} Size : ${down.size}\n`
            if(!down.size.endsWith('KB') && Number(down.size.split(' MB')[0]) > 10){
                teks += `${global.shp} Download : ` + await tiny(down.link)
                teks += `\n\n${global.mess.oversize}`
                return conn.sendFileFromUrl(m.from, filt.thumbnail, {caption: teks, quotedMessageId: msgId})
            }
            teks += `\nTunggu sebentar...\n${m.command == 'play' ? 'Audio' : 'Video'} sedang dikirim`
            await conn.sendFileFromUrl(m.from, filt.thumbnail, {caption: teks, quotedMessageId: msgId})
            const mim = m.command == 'play' ? 'audio/mpeg' : 'video/mp4'
            await conn.sendFileFromUrl(m.from, down.link == undefined ? link2 : down.link, {sendMediaAsDocument: isdoc,  quotedMessageId: msgId, ctwa:{type: 'link'}}, {mimetype: mim, filename: filt.title + '.mp3'})
        }catch(e){
            console.log(e)
            global.eror(m.command, e, m)
        }
    }
}