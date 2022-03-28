const { tebakgambar } = require("../lib/scraper")
const toms = require('ms')
module.exports = {
    name: ['tebakgambar'].map((v) => v + ''),
    cmd: ['tebakgambar'],
    category: 'game',
    desc: ['Bermain game tebak gambar'],
    group: true,
    async handler(m, {conn, msgId, prefix}){
        try{
            conn.game = conn.game ? conn.game : {}
            conn.game.tebakgambar = conn.game.tebakgambar ? conn.game.tebakgambar : {}
            if(conn.game.tebakgambar[m.from] != undefined) return conn.sendMessage(m.from, 'Masih ada game yang berlangsung!', {quotedMessageId: conn.game.tebakgambar[m.from].msgId})
            tebakgambar().then(async tg => {
                tebak = `*TEBAK GAMBAR*\n\n`
                tebak += `Timeout : 30s\n`
                tebak += `Reply ${prefix}hint untuk menampilkan petunjuk\n`
                tebak += `Reply pesan ini untuk menjawab`
                await conn.sendFileFromUrl(m.from, tg.img, {caption: tebak, quotedMessageId: msgId}).then(async send => {
                    conn.game.tebakgambar[m.from] = {
                        id: m.from,
                        timeout: Date.now() + await toms('30s'),
                        msgId: send.id._serialized,
                        ...tg
                    }
                })
            })
        }catch(e){
            global.eror(m.command, e, m)
        }
    }
}