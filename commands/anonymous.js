const fs = require('fs')
const {List} = require('whatsapp-web.js')
module.exports = {
    name: ['anonymous', 'start', 'stop', 'next'],
    cmd: ['anonymous', 'start', 'stop', 'next'],
    category: 'anonymous',
    desc: [`#start untuk memulai mencari partner anonymous\n#stop untuk meninggalkan obrolan\n#next untuk mencari partner lain`],
    private: true,
    async handler(m, {conn, msgId}){
        const desc = '#start untuk memulai mencari partner anonymous\n#stop untuk meninggalkan obrolan\n#next untuk mencari partner lain'
        const anony = JSON.parse(fs.readFileSync('./lib/json/anonymous.json'))
        const isanon = Object.values(anony).find(anon => [anon.a, anon.b].includes(m.sender))
        row = [{
            id: '.start',
            title: 'START',
            description: 'Mulai mencari partner'
        },{
            id: '.stop',
            title: 'STOP/LEAVE',
            description: 'Meninggalkan obrolan'
        },{
            id: '.next',
            title: 'NEXT',
            description: 'Mulai mencari partner yang lain!'
        }]
        section = [{'title':'sectionTitle','rows':row}]
        if(m.command == 'anonymous'){
            await conn.sendMessage(m.from, await new List(desc, 'Click Here', section, 'Anonymous Chat'), {quotedMessageId: msgId})
        }
        else if(m.command == 'start'){
            if(isanon) return m.reply('Kamu masih berada dalam Obrolan!')
            await m.reply('Mencari partner...')
            find = Object.values(anony).find(anon => anon.status == 'search')
            if(find == undefined){
                anony[m.sender] = {
                    id: m.sender,
                    a: m.sender,
                    b: '',
                    status: 'search'
                }
                await fs.writeFileSync('./lib/json/anonymous.json', JSON.stringify(anony))
            }
            else{
                find.b = m.sender
                find.status = 'chatting'
                anony[find.id] = {...find}
                await fs.writeFileSync('./lib/json/anonymous.json', JSON.stringify(anony))
                find = Object.values(anony).find(anon => [anon.a, anon.b].includes(m.sender))
                await conn.sendMessage(find.a, await new List(desc, 'Click Here', section, 'Partner Ditemukan'))
                await conn.sendMessage(find.b, await new List(desc, 'Click Here', section, 'Partner Ditemukan'))
            }
        }
        else if(m.command == 'next'){
            if(!isanon) return m.reply("Kamu belum memulai anonymous chat\nSilahkan .start terlebih dahulu!")
            find = Object.values(anony).find(anon => [anon.a, anon.b].includes(m.sender) && anon.status == 'chatting')
            console.log(find)
            if(find == undefined) return m.reply('Kamu belum mendapatkan partner!')
            pas = find.a == m.sender ? find.b : find.a
            console.log(pas)
            if(!pas) return m.reply('Kamu belum mendapatkan partner!')
            await conn.sendMessage(pas, await new List(desc, 'Click Here', section, 'Partner Meninggalkan Obrolan!'))
            delete anony[find.id]
            await fs.writeFileSync('./lib/json/anonymous.json', JSON.stringify(anony))
            m.command = 'start'
            require('./anonymous.js').handler(m, {conn})
        }
        else if(m.command == 'stop'){
            if(!isanon) return m.reply("Kamu belum memulai anonymous chat\nSilahkan .start terlebih dahulu!")
            find = Object.values(anony).find(anon => [anon.a, anon.b].includes(m.sender))
            pas = find.a == m.sender ? find.b : find.a
            if(find.b != '') await conn.sendMessage(pas, await new List(desc, 'Click Here', section, 'Partner Meninggalkan Obrolan!'))
            delete anony[find.id]
            await fs.writeFileSync('./lib/json/anonymous.json', JSON.stringify(anony))
            m.command = 'anonymous'
            require('./anonymous.js').handler(m, {conn})
        }
    }
}