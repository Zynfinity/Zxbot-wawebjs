const uao = process.env.UserAgent
module.exports = {
    name: ['q'].map((v) => v + ' reply pesan'),
    cmd: /^(q|quoted)$/i,
    category: 'other',
    group: true,
    disabled: true,
    async handler(m, {conn}){
        if(!m.quotedMsg) return reply('reply pesannya!')
        const {quotedMsg} = await conn.getMessageById(m.quotedMsg.id)
        if(quotedMsg == null) return m.reply('Pesan tidak mengandung reply!')
            if(quotedMsg.type == 'chat') m.reply(quotedMsg.body)
            else if(quotedMsg.type == 'image') {
                const mediaData = await conn.decryptMedia(quotedMsg, uao)
                const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                conn.sendImage(m.from, imageBase64, '', quotedMsg.caption, m.id)
            }
    }
}