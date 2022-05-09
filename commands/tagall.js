module.exports = {
    name: ['tagall'],
    cmd: ['tagall'],
    category: 'group',
    desc: ['Tag semua member'],
    group: true,
    admin: true,
    async handler(m, {conn, msgId, zx, text}){
        try{
            mention = `TAG ALL\n`
            mention += `${global.shp} Info : ${text}\n\n`
            const member = await zx.groupMetadata.participants.map(pe => pe.id._serialized)
            for(let i of member){
                mention += `${global.shp} @${i.split('@')[0]}\n`
            }
            conn.mentions(m.from, mention, {quotedMessageId: msgId})
        }catch(e){
            global.eror(m.command, e, m)
        }
    }
}