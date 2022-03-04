const {owner} = require('../lib/config')
module.exports = {
    name: ['owner'].map((v) => v + ''),
    cmd: /^(owner)$/i,
    category: 'other',
    async handler(m, {conn, zx}){
        conn.getContactById(owner).then(con => conn.sendMessage(m.from, con, {quotedMessageId: m.msgId}))
    }
}