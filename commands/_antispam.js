const toms = require('ms')
module.exports = {
    function: true,
    //disabled: true,
    async handler(m, {conn, command, isOwner}){
        if(conn.mode == 'self') return
        conn.cooldown = conn.cooldown ? conn.cooldown : {}
        setInterval(() => {
            conn.cooldown = conn.cooldown ? conn.cooldown : {}
            if (!conn.cooldown) return
            Object.values(conn.cooldown).map((s) => {
              if (Date.now() >= s.timestamp) {
                delete conn.cooldown[s.id]
              }
            })
          }, 1000)
        if(command){
            if(m.sender in conn.cooldown == false){
                conn.cooldown[m.sender] = {
                    id: m.sender,
                    timestamp: Date.now() + toms('5s')
                }
            }
        }
    }
}