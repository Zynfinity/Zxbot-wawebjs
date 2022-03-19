const toms = require('ms')
module.exports = {
    antispam: true,
    ignored: true,
    async handler(m, {conn,  msgId, isOwner, zx}){
        if(conn.mode == 'self') return
        conn.cooldown = conn.cooldown ? conn.cooldown : {}
        setInterval(() => {
            conn.cooldown = conn.cooldown ? conn.cooldown : {}
            if (!conn.cooldown) return
            Object.values(conn.cooldown).map((s) => {
              if (Date.now() >= s.timestamp) {
                delete conn.cooldown[s.id]
                delete conn.cooldown['undefined']
              }
            })
          }, 1000)
        if(m.command){
          await require('../lib/function/function').func(m, conn, zx)
            if(m.sender in conn.cooldown == false){
                conn.cooldown[m.sender] = {
                    id: m.sender,
                    timestamp: Date.now() + await toms('5s')
                }
            }
        }
    }
}