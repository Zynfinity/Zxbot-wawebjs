module.exports = {
    name: ['antiviewonce_function'],
    function: true,
    async handler(m, {conn, msgId}){
        const {db} = require('../lib/database/database')
        const group = await db.collection('groups')
        if((m._data.type == 'video' || m._data.type == 'image') && m._data.isViewOnce == true){
            data = await group.findOne({id: m.from})
            if(data == null) return
            if(!data.antiviewonce) return
            m.reply('ViewOnce Message Detected').then(async s => {
                s._data.quotedMsg.isViewOnce = false
                await conn.sendMessage(m.from, 'antiviewonce', {quotedMessageId: msgId, extra: {...s._data.quotedMsg}})
            })
            //m.forward(m.from)
        }
    }
}