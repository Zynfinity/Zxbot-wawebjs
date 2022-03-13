module.exports = {
    name: ['q'].map((v) => v + ' <reply pesan>'),
    cmd: /^(q|quoted)$/i,
    category: 'other',
    async handler(m, {conn, quotedMsg, hasQuotedMsg}){
        if(!hasQuotedMsg) return conn.reply(m, 'reply pesannya!')
        quot = await m.getQuotedMessage()
        quott = await quot.getQuotedMessage()
        await quott.forward(m.from)
    }
}