module.exports = {
    name: ['add', 'kick'].map((v) => v + ' <tag/reply pesan>'),
    cmd: ['add','kick'],
    category: 'group',
    desc: ['Menambahkan/mengeluarkan member group', '.add/kick <tag/reply pesan>'],
    group: true,
    admin: true,
    botAdmin: true,
    async handler(m, {conn,  msgId, zx, hasQuotedMsg, quotedMsg, text, mentionedIds}){
        try{
            stop = m.command == 'add' ? 'Orang tersebut sudah ada didalam group!' : 'Orang tersebut sudah tidak ada didalam group!'
            success = m.command == 'add' ? `Berhasil menambahkan @${hasQuotedMsg ? quotedMsg.sender.split('@')[0] : mentionedIds != '' ? mentionedIds[0].split('@')[0] : text}` : `Berhasil mengeluarkan @${hasQuotedMsg ? quotedMsg.sender.split('@')[0] : mentionedIds != '' ? mentionedIds[0].split('@')[0] : text}`
            member = zx.participants.map(s => s.id._serialized)
            if(hasQuotedMsg){
                if(m.command == 'add' ? member.includes(quotedMsg.sender) : !member.includes(quotedMsg.sender)) return await m.reply(stop)
                if(m.command == 'add'){
                    add = await zx.addParticipants([quotedMsg.sender])
                    console.log(add)
                    conn.mentions(m.from, success, {quotedMessageId: msgId})
                }else{
                    kick = await zx.removeParticipants([quotedMsg.sender])
                    console.log(kick)
                    conn.mentions(m.from, success, {quotedMessageId: msgId})
                }
            }
            else if(!hasQuotedMsg && mentionedIds != '' || !hasQuotedMsg && text != '' && !isNaN(text)){
                no = mentionedIds != '' ? mentionedIds[0] : text + '@c.us'
                if(m.command == 'add' ? member.includes(no) : !member.includes(no)) return await m.reply(stop)
                if(m.command == 'add'){
                    add = await zx.addParticipants([no])
                    console.log(add)
                    conn.mentions(m.from, success, {quotedMessageId: msgId})
                }else{
                    kick = await zx.removeParticipants([no])
                    console.log(kick)
                    conn.mentions(m.from, success, {quotedMessageId: msgId})
                }
            }
            else m.reply('masukkan nomor/reply chatnya!')
        }catch(e){
            global.eror(m.m.command, e, m)
        }
    }
}