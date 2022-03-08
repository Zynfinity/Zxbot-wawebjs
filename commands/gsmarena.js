const { gsmarena } = require("../lib/scraper")
module.exports = {
    name: ['gsmarena'].map((v) => v + ' <merek hp>'),
    cmd: /^(gsmarena)$/i,
    category: 'search',
    desc: ['Menampilkan spesifikasi hp', '.gsmarena <merek hp>'],
    async handler(m, {conn, text}){
        try{
            if(!text) return m.reply('Mau cari apa?')
            await m.reply(global.mess.wait)
            const data = await gsmarena(text)
            gsm = '*G S M  A R E N A*\n\n'
            for(let i of Object.entries(data)){
                gsm += `${global.shp} ${i[0].toUpperCase()} : ${i[1]}\n\n`
            }
            conn.sendFileFromUrl(m.from, data.thumbnail, {caption: gsm, quotedMessageId: m.msgId})
        }catch(e){
            global.eror(global.command, e, m)
        }
    }
}