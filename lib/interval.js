const fs = require('fs')
const gametimeout = async(conn) => {
        setInterval(() => {
            conn.game = conn.game ? conn.game : {}
            conn.game.tebakgambar = conn.game.tebakgambar ? conn.game.tebakgambar : {}
            conn.game.susunkata = conn.game.susunkata ? conn.game.susunkata : {}
            ddb = JSON.parse(fs.readFileSync('./lib/json/data.json'))
            if(ddb.auto){
              Object.values(ddb.auto).map((s) => {
                if (Date.now() >= s.timestamp) {
                  conn.getChatById(s.id).then(async chat => {
                    delete ddb.auto[s.id]
                    fs.writeFileSync('./lib/json/data.json', JSON.stringify(ddb))
                    return chat.setMessagesAdminsOnly(s.action == 'open' ? false : true)
                    delete ddb.auto['undefined']
                  })
                }
              })
            }
            if (!conn.game) return
            if(conn.game.tebakgambar){
              Object.values(conn.game.tebakgambar).map(async (s) => {
                if (Date.now() >= s.timeout) {
                  timeout = `*_Timeout_*\n\nJawabannya adalah ${s.jawaban}`
                  await conn.sendMessage(s.id, timeout, {quotedMessageId: s.msgId})
                  delete conn.game.tebakgambar[s.id]
                }
              })
            }
            if(conn.game.susunkata){
              Object.values(conn.game.susunkata).map(async (s) => {
                if (Date.now() >= s.timeout) {
                  timeout = `*_Timeout_*\n\nJawabannya adalah ${s.jawaban}`
                  await conn.sendMessage(s.id, timeout, {quotedMessageId: s.msgId})
                  delete conn.game.susunkata[s.id]
                }
              })
            }
            if(conn.game.tebakkata){
              Object.values(conn.game.tebakkata).map(async (s) => {
                if (Date.now() >= s.timeout) {
                  timeout = `*_Timeout_*\n\nJawabannya adalah ${s.jawaban}`
                  await conn.sendMessage(s.id, timeout, {quotedMessageId: s.msgId})
                  delete conn.game.tebakkata[s.id]
                }
              })
            }
        }, 1000)
}
module.exports = gametimeout