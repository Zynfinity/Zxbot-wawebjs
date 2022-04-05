module.exports = {
    name: ['block', 'unblock'].map((v) => v + ' <tag/reply chat>'),
    cmd: ['block','unblock'],
    category: 'owner',
    desc: ['Block/Unblock User', '.block/unblock <tag/reply chat>'],
    owner: true,
    async handler(m, {conn, msgId, hasQuotedMsg, quotedMsg, mentionedIds}){
        isblok = m.command == 'block' ? 'User sudah diblokir sebelumnya!' : 'User tidak diblokir sebelumnya!'
        res = m.command == 'block' ? 'Berhasil block user' : 'Berhasil unblock user!'
        if(hasQuotedMsg){
            userp = await conn.getContactById(quotedMsg.sender)
            if(m.command == 'block' ? userp.isBlocked : !userp.isBlocked) return await m.reply(isblok)
            m.command == 'block' ? await userp.block() : await userp.unblock()
            m.reply(res)
        }
        else if(!hasQuotedMsg && mentionedIds != ''){
            userp = await conn.getContactById(mentionedIds[0])
            if(m.command == 'block' ? userp.isBlocked : !userp.isBlocked) return await m.reply(isblok)
            m.command == 'block' ? await userp.block() : await userp.unblock()
            m.reply(res)
        }
    }
}