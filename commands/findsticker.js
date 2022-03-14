const {stickersearch} = require('../lib/scraper')
const {stickerMetadata} = require('../lib/config')
module.exports = {
    name: ['findsticker'].map((v) => v + ' <query>'),
    cmd: /^(findsticker|caristicker)$/i,
    category: 'search',
    desc: ['Mencari sticker berdasarkan kata kunci', '.findsticker <query>'],
    async handler(m, {conn, text}){
        if(!text) return await conn.reply(m, 'mau cari sticker apa?')
        conn.reply(m, global.mess.wait)
        stickersearch(text).then(res => {
            for(let i=0; i<10; i++){
                conn.sendStickerFromUrl(m.from, res.sticker[i], text, stickerMetadata.stickerAuthor)
            }
        })
    }
}