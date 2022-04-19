const axios = require('axios')
const toms = require('ms')
const {List} = require('whatsapp-web.js')
module.exports = {
    name: ['family100'],
    cmd: ['family100'],
    category: 'game',
    desc: ['bermain game family100'],
    group: true,
    game: true,
    async handler(m, {conn, msgId, args}){
        conn.game = conn.game ? conn.game : {}
        conn.game.family = conn.game.family ? conn.game.family : {}
        gdata = conn.game.family[m.from]
        if(args[0] == '-nyerah'){
            if(gdata == undefined) return m.reply('Game sudah berakhir!')
            family = `${global.shp} Soal : ${gdata.soal}\n\n`
            for(let i=1; i<=gdata.jawaban.length; i++){
                urut = gdata.terjawab.find(ter => ter.pos == i)
                if(urut != undefined) family += `${i}. ${urut.jawaban} <@${urut.sender.id._serialized.split('@')[0]}> + ${urut.pos == 1 ? '150' : '100'}\n`
                else family += `${i}. ${gdata.jawaban[i - 1]}\n`
            }
            row = [{
                id: '.family100',
                title: 'Mulai Family100',
                description: 'Bermain family100 lagi'
            }]
            section = [{'title':'sectionTitle','rows':row}]
            list = await new List(family, 'Click Here', section, '*Family100*')
            await conn.sendMessage(m.from, list, {quotedMessageId: msgId, mentions: gdata.terjawab.map(kon => kon.sender)})
            return delete conn.game.family[m.from]
        }
        const {data} = await axios.get('https://raw.githubusercontent.com/Zynfinity/json/main/game/family100.json')
        rand = data[Math.floor(Math.random() * data.length)]
        family = `${global.shp} Soal : ${rand.soal}\n`
        family += `${global.shp} Jawaban : ${rand.jawaban.length}\n\n`
        family += `Waktu 60s Untuk Menjawab`
        row = [{
            id: '.family100 -nyerah',
            title: 'Nyerah',
            description: 'Selesaikan Game'
        }]
        section = [{'title':'sectionTitle','rows':row}]
        list = await new List(family, 'Click Here', section, '*Family100*')
        await conn.sendMessage(m.from, list, {quotedMessageId: msgId}).then(async id => {
            conn.game.family[m.from] = {
                id: m.from, 
                timeout: Date.now() + await toms('60s'),
                ...rand,
                terjawab: [],
                msgId: id.id._serialized
            }
        })
    }
}