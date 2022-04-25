const {List} = require('whatsapp-web.js')
module.exports = {
    name: ['styletext <text>'],
    cmd: ['styletext', 'style'],
    category: 'other',
    desc: ['Mengubah font text'],
    async handler(m, {conn, text, msgId}){
        try{
            if(!text) return m.reply('Textnya mana gan?')
            await m.reply(mess.wait)
            row = []
            scrapp.styleText(text).then(async style => {
                Object.entries(style).map(async ress => {
                    row.push({
                        id: `.`,
                        title: ress[1],
                        description: ress[0]
                    })
                })
                section = [{'title':'p','rows':row}]
                list = await new List('text : ' + text, 'Click Here', section, '*STYLE TEXT*')
                await conn.sendMessage(m.from, list, {quotedMessageId: msgId})
            })
        }catch(e){
            global.eror(m.command, e, m)
        }
    }
}