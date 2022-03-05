module.exports = {
    name: ['block', 'unblock'].map((v) => v + ' <tag/reply chat>'),
    cmd: /^(block|unblock)$/i,
    category: 'owner',
    desc: ['Block/Unblock User', '.block/unblock <tag/reply chat>'],
    owner: true,
    async handler(m, {conn, hasQuotedMsg, quotedMsg, command, mentionedIds}){
        isblok = command == 'block' ? 'User sudah diblokir sebelumnya!' : 'User tidak diblokir sebelumnya!'
        res = command == 'block' ? 'Berhasil block user' : 'Berhasil unblock user!'
        if(hasQuotedMsg){
            userp = await conn.getContactById(quotedMsg.sender)
            if(command == 'block' ? userp.isBlocked : !userp.isBlocked) return m.reply(isblok)
            await userp.block()
            m.reply(res)
        }
        else if(!hasQuotedMsg && mentionedIds != ''){
            userp = await conn.getContactById(mentionedIds[0])
            if(command == 'block' ? userp.isBlocked : !userp.isBlocked) return m.reply(isblok)
            await userp.block()
            m.reply(res)
        }
    }
}