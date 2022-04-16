const toms = require('ms')
module.exports = {
  name: ['antispam_function'],
    antispam: true,
    function: true,
    async handler(m, {conn,  msgId, isOwner, zx}){
        if(conn.mode == 'self') return
        if(m.command){
            if(m.sender in conn.cooldown == false){
                conn.cooldown[m.sender] = {
                    id: m.sender,
                    timestamp: Date.now() + await toms('5s')
                }
            }
        }
    }
}