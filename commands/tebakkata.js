const axios = require('axios')
const {List} = require('whatsapp-web.js')
const toms = require('ms')
module.exports = {
    name: ['tebakkata'].map((v) => v),
    cmd: ['tebakkata'],
    category: 'game',
    desc: ['Bermain tebak kata'],
    group: true,
    async handler(m, {conn, hasQuotedMsg, msgId}){
        conn.game = conn.game ? conn.game : {}
        conn.game.tebakkata = conn.game.tebakkata ? conn.game.tebakkata : {}
        if(conn.game.tebakkata[m.from] != undefined) return conn.sendMessage(m.from, 'Masih ada game yang berlangsung!', {quotedMessageId: conn.game.tebakkata[m.from].msgId})
        const {data} = await axios.get('https://raw.githubusercontent.com/Zynfinity/json/main/tebakkata.json')
        rand = data[Math.floor(Math.random() * data.length)]
        tkata = `*TEBAK KATA*\n\n`
        tkata += `${rand.pertanyaan}\n\n`
        tkata += 'Reply untuk menjawab\n'
        tkata += 'Waktu menjawab 30s'
        await conn.sendMessage(m.from, tkata, {quotedMessageId: msgId}).then(async re => {
            conn.game.tebakkata[m.from] = {
                id: m.from,
                timeout: Date.now() + await toms('30s'),
                msgId: re.id._serialized,
                ...rand
            }
        })
    }
}