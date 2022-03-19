const {db} = require('../lib/database/database')
const data = db.collection('afk')
module.exports = {
    name: ['afk'].map((v) => v + ' <reason>'),
    cmd: ['afk'],
    category: 'other',
    desc: ['', '.afk <reason>'],
    group: true,
    async handler(m, {conn,  msgId, text}){
        if(await data.findOne({id: m.author}) != null){
            data.updateOne({id: m.author}, {$set : {reason: text ? text : 'Nothing', time: Date.now()}})
            afk = `*Anda telah afk*\n\n${global.shp} Reason : ${text ? text : 'Nothing'}`
            return await m.reply(afk)
        }
        data.insertOne({id: m.author, reason: text ? text : 'Nothing', time: Date.now()})
        afk = `*Anda telah afk*\n\n${global.shp} Reason : ${text ? text : 'Nothing'}`
        m.reply(afk)
    }
}