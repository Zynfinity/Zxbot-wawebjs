module.exports = {
    name: ['function_susunkata'],
    function: true,
    ignored: true,
    async handler(m, {conn, hasQuotedMsg, zx, budy, prefix}){
        conn.game = conn.game ? conn.game : {}
        conn.game.susunkata = conn.game.susunkata ? conn.game.susunkata : {}
        if(!hasQuotedMsg) return
        gdata = conn.game.susunkata[m.from]
        if(gdata == undefined) return
        if(budy == `${prefix}hint`) return
        quot = await m.getQuotedMessage()
        if(gdata.msgId == quot.id._serialized){
            if(gdata.jawaban.toLowerCase() == budy.toLowerCase()){
                m.reply('Jawaban Benar')
                delete conn.game.susunkata[m.from]
            }
            else{
                m.reply("Jawaban salah")
            }
        }
    }
}