const yts = require('yt-search')
const {youtube} = require('../lib/scraper')
const { tiny } = require('../lib/tools')
module.exports = {
    name: ['play', 'video'].map((v) => v + ' <query>'),
    cmd: /^(play|video)$/i,
    category: 'downloader',
    desc: ['Mendownload video/audio dari youtube berdasarkan kata kunci!', '.play <query>'],
    disabled: true,
    async handler(m, {conn, msgId, text, command}){
        try{
            if(!text) return await conn.reply(m, 'Kata kuncinya mana?', msgId)
            conn.reply(m, global.mess.wait, msgId)
            cari = await yts(text)
            filt = cari.all.filter(res => res.type == 'video')[0]
            down = await youtube(filt.url)
            teks = command == 'play' ? `P L A Y  M U S I C\n\n` : `P L A Y  V I D E O\n\n`
            teks += `${global.shp} Title : ${filt.title}\n`
            teks += `${global.shp} Author : ${filt.author.name}\n`
            teks += `${global.shp} Duration : ${filt.timestamp}\n`
            teks += `${global.shp} Upload Date : ${filt.ago == undefined ? '-' : filt.ago}\n`
            teks += `${global.shp} Type : ${command == 'play' ? 'Mp3' : 'Mp4'}\n`
            teks += `${global.shp} Size : ${command == 'play' ? down.size_mp3 : down.size}\n`
            if(command == 'play' ? !down.size_mp3.endsWith('KB') && down.size.split(' MB')[0] > 50 : !down.size.endsWith('KB') && down.size.split(' MB')[0] > 10){
                teks += command == 'play' ? `${global.shp} Download : ` + await tiny(down.mp3) : `${global.shp} Download : ` + await tiny(down.link) + '\n\n'
                teks += `\n\n${global.mess.oversize}`
                return conn.sendFileFromUrl(m.from, filt.thumbnail, {caption: teks, quotedMessageId: msgId})
            }
            teks += `\nTunggu sebentar...\n${command == 'play' ? 'Audio' : 'Video'} sedang dikirim`
            await conn.sendFileFromUrl(m.from, filt.thumbnail, {caption: teks, quotedMessageId: msgId})
            mim = command == 'play' ? 'audio/mpeg' : 'video/mp4'
            await conn.sendFileFromUrl(m.from, command == 'play' ? down.mp3 : down.link, {quotedMessageId: msgId}, {mimetype: mim})
        }catch(e){
            global.eror(global.command, e, m)
        }
    }
}