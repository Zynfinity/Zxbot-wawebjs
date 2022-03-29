module.exports = {
    name: ['function_tebakgambar'],
    function: true,
    ignored: true,
    async handler(m, {conn, hasQuotedMsg, zx, budy, prefix}){
        const {db} = require('../lib/database/database')
        userdb = db.collection('users')
        conn.game = conn.game ? conn.game : {}
        conn.game.tebakgambar = conn.game.tebakgambar ? conn.game.tebakgambar : {}
        if(!hasQuotedMsg) return
        gdata = conn.game.tebakgambar[m.from]
        if(gdata == undefined) return
        if(budy == `${prefix}hint`) return
        quot = await m.getQuotedMessage()
        if(gdata.msgId == quot.id._serialized){
            if(gdata.jawaban.toLowerCase() == budy.toLowerCase()){
                users = await userdb.findOne({id: m.sender})
                if(users == null){
                    userdb.insertOne({
                        id: m.sender,
                        limit: 0,
                        balance: 50
                    })
                }
                else{
                    userdb.updateOne({
                        id: m.sender
                    },{
                        $set: {
                            balance: users.balance + 50
                        }
                    })
                }
                m.reply('Benar, + 50 Balance\n.mybank untuk mengecek')
                delete conn.game.tebakgambar[m.from]
            }
            else{
                m.reply("Jawaban salah")
            }
        }
    }
}