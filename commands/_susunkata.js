module.exports = {
    name: ['function_susunkata'],
    function: true,
    ignored: true,
    async handler(m, {conn, hasQuotedMsg, zx, budy, prefix}){
        const {db} = require('../lib/database/database')
        userdb = await db.collection('users')
        conn.game = conn.game ? conn.game : {}
        conn.game.susunkata = conn.game.susunkata ? conn.game.susunkata : {}
        if(!hasQuotedMsg) return
        gdata = conn.game.susunkata[m.from]
        if(gdata == undefined) return
        if(budy == `${prefix}hint`) return
        quot = await m.getQuotedMessage()
        if(gdata.msgId == quot.id._serialized){
            if(gdata.jawaban.toLowerCase() == budy.toLowerCase()){
                delete conn.game.susunkata[m.from]
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
            }
        }
    }
}