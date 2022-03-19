const {owner} = require('../lib/config')
module.exports = {
    name: ['owner'].map((v) => v + ''),
    cmd: ['owner'],
    category: 'other',
    async handler(m, {conn,  msgId, zx}){
        conn.getContactById(owner).then(con => conn.sendMessage(m.from, con, {quotedMessageId: msgId}))
    }
}