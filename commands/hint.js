module.exports = {
    name: ['hint'].map((v) => v),
    cmd: ['hint'],
    category: 'other',
    ignored: true,
    async handler(m, {conn, hasQuotedMsg}){
        if(!hasQuotedMsg) return
        gdata = conn.game.tebakgambar[m.from]
        gdata1 = conn.game.susunkata[m.from]
        quot = await m.getQuotedMessage()
        if(gdata != undefined){
            if(quot.id._serialized == gdata.msgId){
                m.reply('Hint : ' + gdata.petunjuk)
            }
        }
        else if(gdata1 != undefined){
            console.log(quot.id._serialized + ' ' + gdata1.msgId)
            if(quot.id._serialized == gdata1.msgId){
                m.reply('Hint : ' + gdata1.pertanyaan.split(' : ')[0])
            }
        } 
    }
}