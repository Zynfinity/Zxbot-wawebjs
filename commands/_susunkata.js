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
        sdata = conn.game.susunkata[m.from]
        if(sdata == undefined) return
        if(budy == `${prefix}hint`) return
        quot = await m.getQuotedMessage()
        if(sdata.msgId == quot.id._serialized){
            if(sdata.jawaban.toLowerCase() == budy.toLowerCase()){
                delete conn.game.susunkata[m.from]
                users = await userdb.findOne({id: m.sender})
                m.reply('Benar, + 50 Balance\n.mybank untuk mengecek')
                if(users == null){
                    return userdb.insertOne({
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
            }
        }
    }
}