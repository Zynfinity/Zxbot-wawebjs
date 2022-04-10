module.exports = {
    name: ['function_tebakkata'],
    function: true,
    async handler(m, {conn, hasQuotedMsg, zx, budy, prefix}){
        const {db} = require('../lib/database/database')
        userdb = await db.collection('users')
        conn.game = conn.game ? conn.game : {}
        conn.game.tebakkata = conn.game.tebakkata ? conn.game.tebakkata : {}
        if(!hasQuotedMsg) return
        gdata = conn.game.tebakkata[m.from]
        if(gdata == undefined) return
        if(budy == `${prefix}hint`) return
        quot = await m.getQuotedMessage()
        if(gdata.msgId == quot.id._serialized){
            if(gdata.jawaban.toLowerCase() == budy.toLowerCase()){
                delete conn.game.tebakkata[m.from]
                users = await userdb.findOne({id: m.sender})
                if(users == null){
                    userdb.insertOne({
                        id: m.sender,
                        limit: 0,
                        balance: 100
                    })
                }
                else{
                    userdb.updateOne({
                        id: m.sender
                    },{
                        $set: {
                            balance: users.balance + 100
                        }
                    })
                }
                m.reply('Benar, + 100 Balance\n.mybank untuk mengecek')
            }
        }
    }
}