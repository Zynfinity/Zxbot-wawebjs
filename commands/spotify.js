const fs = require('fs')
const { spotifysearch } = require("../lib/scraper")
const spotifydlCore = require("spotifydl-core").default
const credential = {
          clientId: '271f6e790fb943cdb34679a4adcc34cc',
          clientSecret: 'c009525564304209b7d8b705c28fd294'
          }
const spotify = new spotifydlCore(credential)
module.exports = {
    name: ['spotify'].map((v) => v + ' <query>'),
    cmd: ['spotify'],
    category: 'downloader',
    desc: ['Mendownload lagu dari spotify berdasarkan kata kunci', '.spotify <query>'],
    disabled: true,
    async handler(m, {conn,  msgId, text}){
        try{
            if(!text) return await m.reply('Mau cari apa?')
            await m.reply(global.mess.wait)
            data = await spotifysearch(text)
            artis = data.artist.map(s => s.name).join(' && ')
            spoti = '*S P O T I F Y  P L A Y*\n\n'
            spoti += `${global.shp} Judul : ${data.judul}\n`
            spoti += `${global.shp} Artists : ${artis}\n`
            spoti += `${global.shp} Release Date : ${data.release_date}\n\nTunggu sebentar..\nAudio sedang dikirim`
            await conn.sendFileFromUrl(m.from, data.thumbnail, {caption: spoti, quotedMessageId: msgId})
            spotify.downloadTrack(data.track).then(async res => {
                await conn.sendFileFromBuffer(m.from, res, 'audio/mpeg', {quotedMessageId: msgId})
            })
        }catch(e){
            global.eror(m.m.command, e, m)
        }
    }
}