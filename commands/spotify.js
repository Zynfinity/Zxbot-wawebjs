const axios = require('axios')
module.exports = {
    name: ['spotify'].map((v) => v + ' <query>'),
    cmd: ['spotify'],
    category: 'downloader',
    desc: ['Mendownload lagu dari spotify berdasarkan kata kunci', '.spotify <query>'],
    async handler(m, {conn,  msgId, text}){
        try{
            if(!text) return await m.reply('Mau cari apa?')
            await m.reply(global.mess.wait)
            const {data} = await axios.get(`https://spotifydl.up.railway.app/search?query=${text}`)
            if(!data.status) return m.reply(data)
            res = data.result[0]
            res.artist = res.artist[0].name
            await conn.sendFileFromUrl(m.from, res.thumbnail, {quotedMessageId: msgId, caption: await tools.parseResult('SPOTIFY PLAY', res, {delete: ['thumbnail']})})
            const down = await axios.get(`https://spotifydl.up.railway.app/download?url=${res.track}`)
            if(!down.status) return m.reply(down)
            await conn.sendFileFromUrl(m.from, down.data.url, {ctwa: {type: 'link'}, quotedMessageId: msgId})
        }catch(e){
            global.eror(m.command, e, m)
        }
    }
}