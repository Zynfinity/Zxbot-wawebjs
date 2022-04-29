const scrapp = require('../lib/scraper')
module.exports = {
    name: ['instagram'].map((v) => v + ' <link>'),
    cmd: ['igdl','instagram','ig'],
    category: 'downloader',
    desc: ['Mendownload media dari instagram', '.@command <link>'],
    async handler(m, {conn,  msgId, text}){
        try{
            if(!text) return await m.reply('masukkan linknya!')
            if(!m.isUrl(text)) return await m.reply('Link tidak valid!')
            m.reply(global.mess.wait)
            if(/stories/.test(text)){
                const stories = await ig.fetchStories(text.split('/')[4])
                many = stories.stories.length > 1 ? true : false
                if(many) await m.reply('Jumlah media lebih dari 1, media akan dikirim lewat private chat (PC)\nSilahkan cek chat dari bot><!')
                stories.stories.map(async igeh => {
                    await conn.sendFileFromUrl(many ? m.sender : m.from, igeh.url, {quotedMessageId: msgId})
                })
            }else{
                scrapp.igdl(text).then(async res => {
                    many = res.length > 1 ? true : false
                    if(many) await m.reply('Jumlah media lebih dari 1, media akan dikirim lewat private chat (PC)\nSilahkan cek chat dari bot><!')
                    res.map(async s => {
                        await conn.sendFileFromUrl(many ? m.sender : m.from, s, {quotedMessageId: msgId})
                    })
                })
            }
        }catch(e){
            global.eror(m.command, e, m)
        }
    }
}