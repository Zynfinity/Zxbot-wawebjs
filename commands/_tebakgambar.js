module.exports = {
    name: ['function_tebakgambar'],
    function: true,
    ignored: true,
    async handler(m, {conn, hasQuotedMsg, zx, budy, prefix}){
        conn.game = conn.game ? conn.game : {}
        conn.game.tebakgambar = conn.game.tebakgambar ? conn.game.tebakgambar : {}
        if(!hasQuotedMsg) return
        gdata = conn.game.tebakgambar[m.from]
        if(gdata == undefined) return
        if(budy == `${prefix}hint`) return
        quot = await m.getQuotedMessage()
        if(gdata.msgId == quot.id._serialized){
            if(gdata.jawaban.toLowerCase() == budy.toLowerCase()){
                m.reply('Jawaban Benar')
                delete conn.game.tebakgambar[m.from]
            }
            else{
                m.reply("Jawaban salah")
            }
        }
    }
}