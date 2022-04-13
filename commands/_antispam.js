const toms = require('ms')
module.exports = {
  name: ['antispam_function'],
    antispam: true,
    function: true,
    async handler(m, {conn,  msgId, isOwner, zx}){
        const {db} = require('../lib/database/database')
        const game = await db.collection('groups')
        if(conn.mode == 'self') return
        if(m.command){
            if(!zx.isGroup && m.sender in conn.cooldown == false){
                conn.cooldown[m.sender] = {
                    id: m.sender,
                    timestamp: Date.now() + await toms('3s')
                }
            }
            else if(zx.isGroup){
                isgame = await game.findOne({id: m.from})
                if(isgame != null){
                    if(isgame.game){
                        conn.cooldown[m.from] = {
                            id: m.from,
                            timestamp: Date.now() +await toms('3s')
                        }
                    }
                    else{
                        conn.cooldown[m.sender] = {
                            id: m.sender,
                            timestamp: Date.now() +await toms('3s')
                        }
                    }
                }
            }
        }
    }
}