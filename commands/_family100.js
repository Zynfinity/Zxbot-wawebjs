const {List} = require('whatsapp-web.js')
const ms = require('parse-ms')
module.exports = {
    name: ['function_family'],
    function: true,
    ignored: true,
    async handler(m, {conn, hasQuotedMsg, zx, msgId, budy, prefix}){
        if(!zx.isGroup && budy.startsWith(prefix)) return
        const {db} = require('../lib/database/database')
        userdb = await db.collection('users')
        conn.game = conn.game ? conn.game : {}
        conn.game.family = conn.game.family ? conn.game.family : {}
        gdata = conn.game.family[m.from]
        if(gdata == undefined) return
        if(budy == `${prefix}hint`) return
        if(gdata.jawaban.includes(budy.toLowerCase())){
            index = gdata.jawaban.indexOf(budy.toLowerCase())
            if(gdata.terjawab.find(f => f.pos == index + 1) != undefined) return
            gdata.terjawab.push({
                pos: index + 1,
                jawaban: budy.toLowerCase(),
                sender: await conn.getContactById(m.sender)
            })
            after = conn.game.family[m.from]
            family = `${global.shp} Soal : ${gdata.soal}\n`
            family += `${global.shp} Jawaban : tersisa ${gdata.jawaban.length - after.terjawab.length}\n\n`
            for(let i=1; i<=gdata.jawaban.length; i++){
                urut = after.terjawab.find(ter => ter.pos == i)
                if(urut != undefined) family += `${i}. ${urut.jawaban} <@${urut.sender.id._serialized.split('@')[0]}> + ${urut.pos == 1 ? '150' : '100'}\n`
                else family += `${i}. ???\n`
            }
            family += `\nWaktu tersisa ${(await ms(gdata.timeout - Date.now())).seconds}s`
            row = [{
                id: `${after.terjawab.length == gdata.jawaban.length ? '.family100' : '.family100 -nyerah'}`,
                title: `${after.terjawab.length == gdata.jawaban.length ? 'Mulai Family100' : 'Nyerah'}`,
                description: `${after.terjawab.length == gdata.jawaban.length ? 'Bermain kembali family100' : 'selesaikan family100'}`
            }]
            after.terjawab.length == gdata.jawaban.length ? delete conn.game.family[m.from] : ''
            section = [{'title':'sectionTitle','rows':row}]
            list = await new List(family, 'Click Here', section, '*Family100*')
            conn.sendMessage(m.from, list, {quotedMessageId: msgId, mentions: after.terjawab.map(kon => kon.sender)})
            users = await userdb.findOne({id: m.sender})        
            if(users == null){
                return userdb.insertOne({
                    id: m.sender,
                    balance: index == 0 ? 150 : 100,
                    limit: 0
                })
            }
            await userdb.updateOne({
                id: m.sender
            },{
                $set: {
                    balance: index == 0 ? users.balance + 150 : users.balance + 100
                }
            })
        }
    }
}