const {db} = require('../lib/database/database')
const data = db.collection('afk')
module.exports = {
    name: ['afk'].map((v) => v + ' <reason>'),
    cmd: /^(afk)$/i,
    category: 'other',
    desc: ['', '.afk <reason>'],
    group: true,
    disabled: true,
    async handler(m, {conn, text}){
        if(await data.findOne({id: m.sender.id}) != null){
            data.updateOne({id: m.sender.id}, {$set : {reason: text ? text : 'Nothing', time: Date.now()}})
            afk = `*Anda telah afk*\n\n${global.shp} Reason : ${text ? text : 'Nothing'}`
            return m.reply(afk)
        }
        data.insertOne({id: m.sender.id, reason: text ? text : 'Nothing', time: Date.now()})
        afk = `*Anda telah afk*\n\n${global.shp} Reason : ${text ? text : 'Nothing'}`
        m.reply(afk)
    }
}