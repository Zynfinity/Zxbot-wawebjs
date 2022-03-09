module.exports = {
    name: ['q'].map((v) => v + ' <reply pesan>'),
    cmd: /^(q|quoted)$/i,
    category: 'other',
    group: true,
    async handler(m, {conn, quotedMsg, hasQuotedMsg}){
        if(!hasQuotedMsg) return reply('reply pesannya!')
        quot = await m.getQuotedMessage()
        quott = await quot.getQuotedMessage()
        await quott.forward(m.from)
    }
}