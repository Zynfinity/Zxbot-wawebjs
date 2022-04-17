const translate = require("@vitalets/google-translate-api")
const lang = JSON.parse(require('fs').readFileSync('./lib/json/lang.json'))
const {List} = require('whatsapp-web.js')
module.exports = {
    name: ['translate'].map((v) => v + ' <kodebahasa text>'),
    cmd: ['translate','tr'],
    category: 'other',
    desc: ['Menerjemahkan text ke bahasa lain', '.@command <kodebahasa text>'],
    async handler(m, {conn, args, msgId, zx, text}){
        try{
            if(!text) return await m.reply('textnya mana?')
            if(args[0].split('|')[0] && !lang[args[0].split('|')[0]]){
                row = []
                Object.keys(lang).map(id => {
                    row.push({
                        id: `.translate ${id}|${text}`,
                        title: `${lang[id]} [${`${id}`}]`,
                        description: `Translate ke bahasa ${lang[id]}`
                    })
                })
                section = [{'title':'sectionTitle','rows':row}]
                list = await new List('Klik Dibawah', 'Click Here', section, `${global.shp} *Translate*`)
                await conn.sendMessage(m.from, list, {quotedMessageId: msgId})
            }
            else if(lang[args[0].split('|')[0]]){
                if(text.split('|')[1] == undefined && !args[1]) return m.reply('Teksnya mana?')
                tra = await translate(text.slice(args[0].length + 1), {
                    to: args[0].split('|')[0],
                })
                m.reply(tra.text)
            }
        }catch(e){
            global.eror(m.command, e, m)
        }
    }
}