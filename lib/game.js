const gametimeout = async(conn) => {
        setInterval(() => {
            conn.game = conn.game ? conn.game : {}
            conn.game.tebakgambar = conn.game.tebakgambar ? conn.game.tebakgambar : {}
            conn.game.susunkata = conn.game.susunkata ? conn.game.susunkata : {}
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
        }, 1000)
}
module.exports = gametimeout