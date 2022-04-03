const axios = require('axios')
const {List} = require('whatsapp-web.js')
const toms = require('ms')
module.exports = {
    name: ['susunkata'].map((v) => v),
    cmd: ['susunkata'],
    category: 'game',
    desc: ['Bermain susun kata'],
    group: true,
    async handler(m, {conn, hasQuotedMsg, msgId}){
        conn.game = conn.game ? conn.game : {}
        conn.game.susunkata = conn.game.susunkata ? conn.game.susunkata : {}
        if(conn.game.susunkata[m.from] != undefined) return conn.sendMessage(m.from, 'Masih ada game yang berlangsung!', {quotedMessageId: conn.game.susunkata[m.from].msgId})
        const {data} = await axios.get('https://raw.githubusercontent.com/Zynfinity/json/main/susunkata.json')
        rand = data[Math.floor(Math.random() * data.length)]
        row = [{
            id: '.hint',
            title: 'Hint',
            description: 'Petunjuk'
        }]
        section = [{'title':'sectionTitle','rows':row}]
        txt = `${rand.pertanyaan.split(' : ')[1].toLowerCase()}\n\nReply untuk menjawab!\nWaktu menjawab 30s\n\n*_Note_* : _Kalo jawaban gak digubris bot, berarti jawaban salah!_`
        list = await new List(txt, 'Click Here', section, '*SUSUN KATA*')
        await conn.sendMessage(m.from, list, {quotedMessageId: msgId}).then(async re => {
            conn.game.susunkata[m.from] = {
                id: m.from,
                timeout: Date.now() + await toms('30s'),
                msgId: re.id._serialized,
                ...rand
            }
        })
    }
}