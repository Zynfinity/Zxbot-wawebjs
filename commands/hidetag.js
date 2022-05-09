const { sleep } = require("../lib/tools")
module.exports = {
    name: ['hidetag'].map((v) => v + ' <text>'),
    cmd: ['hidetag'],
    category: 'group',
    group: true,
    admin: true,
    async handler(m, {conn,  zx, msgId, quotedMsg, hasQuotedMsg, text}){
        try{
            memid = zx.groupMetadata.participants.map(s => s.id._serialized)
            kon = []
            memid.map(async id => {
                kon.push(await conn.getContactById(id))
            })
            await sleep(3000)
            if(!hasQuotedMsg){
                if(!text) return await m.reply('Teksnya mana?')
                await conn.sendMessage(m.from, text, {mentions: kon, extra: {
                    quotedMsg: {
                    type: 'chat',
                    body: 'Hidetag'
                    },
                    quotedParticipant: '0@s.whatsapp.net'}})
            }
            else if(hasQuotedMsg){
                quot = await m.getQuotedMessage()
                down = await quot.downloadMedia()
                if(down == undefined) return await conn.sendMessage(m.from, m.quoted.body, {mentions: kon})
                await conn.sendMessage(m.from, down, {sendMediaAsSticker: quotedMsg.type == 'sticker' ? true : false, mentions: kon})
            }
        }catch(e){
            global.eror(m.command, e, m)
        }
    }
}