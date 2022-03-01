const {owner} = require('../lib/config')
module.exports = {
    name: ['owner'].map((v) => v + ''),
    cmd: /^(owner)$/i,
    category: 'other',
    async handler(m, {conn}){
        await conn.sendContact(m.from, owner)
    }
}