module.exports = {
    name: ['promote', 'demote'].map((v) => v + ' <tag/reply chat>'),
    cmd: ['promote','pm','demote','dm'],
    category: 'group',
    desc: ['Promote : Untuk mempromosikan seseorang untuk menjadi admin\nDemote : Untuk menurunkan jabatan admin seseorang', '.promote/demote <tag/reply chat>'],
    group: true,
    admin: true,
    botAdmin: true,
    async handler(m, {conn,  msgId, zx, mentionedIds, admin, hasQuotedMsg, quotedMsg, m.command}){
        if(hasQuotedMsg){
            selamat = m.command == 'promote' || m.command == 'pm' ? `Selamat @${quotedMsg.sender.split('@')[0]}, Anda telah menjadi admin...`: `Selamat @${quotedMsg.sender.split('@')[0]}, jabatan admin anda telah dicopot:v`
            cek = m.command == 'promote' || m.command == 'pm' ? 'Orang tersebut sudah menjadi admin!' : 'Dia bukan admin:v'
            cekk = m.command == 'promote' || m.command == 'pm' ? admin.includes(quotedMsg.sender) : !admin.includes(quotedMsg.sender)
            if(cekk) return await m.reply(cek)
            m.command == 'promote' || m.command == 'pm' ? await zx.promoteParticipants([quotedMsg.sender]) : await zx.demoteParticipants([quotedMsg.sender])
            //conn.sendMessage(m.from, selamat, {quotedMessageId: msgId, mentions: [await conn.getContactById(quotedMsg.sender)]})
        }
        else if(!hasQuotedMsg && mentionedIds != ''){
            selamat = m.command == 'promote' || m.command == 'pm' ? `Selamat @${mentionedIds[0].split('@')[0]}, Anda telah menjadi admin...`: `Selamat @${mentionedIds[0].split('@')[0]}, jabatan admin anda telah dicopot:v`
            cek = m.command == 'promote' || m.command == 'pm' ? 'Orang tersebut sudah menjadi admin!' : 'Dia bukan admin:v'
            cekk = m.command == 'promote' || m.command == 'pm' ? admin.includes(mentionedIds[0]) : !admin.includes(mentionedIds[0])
            if(cekk) return await m.reply(cek)
            m.command == 'promote' || m.command == 'pm' ? await zx.promoteParticipants([mentionedIds[0]]) : await zx.demoteParticipants([mentionedIds[0]])
            //conn.sendMessage(m.from, selamat, {quotedMessageId: msgId, mentions: [await conn.getContactById(mentionedIds[0])]})
        }
        else m.reply('tag orang/ reply chat orang yang ingin di ' + m.command)
    }
}