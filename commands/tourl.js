const { telegraph } = require('../lib/tools')
module.exports = {
    name: ['tourl'].map((v) => v + ' <reply/kirim image>'),
    cmd: ['tourl'],
    category: 'other',
    desc: ['upload media ke telegraph'],
    async handler(m, {conn, hasQuotedMsg, msgId, quotedMsg}){
        if(!hasQuotedMsg && (m.type == 'image' || m.type == 'video')){
            down = await m.downloadMedia()
            buff = await Buffer.from(down.data, 'base64')
            telegraph(buff).then(async res => {
                 m.reply(res)
            })
        }
        else if(hasQuotedMsg && (quotedMsg.type == 'image' ||  quotedMsg.type == 'video')){
            quot = await m.getQuotedMessage()
            down = await quot.downloadMedia()
            buff = await Buffer.from(down.data, 'base64')
            telegraph(buff).then(async res => {
                 m.reply(res)
            })
        }
    }
}