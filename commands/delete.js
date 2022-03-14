module.exports = {
    name: ['delete'].map((v) => v + ' <reply chat bot>'),
    cmd: /^(delete|del)$/i,
    category: 'other',
    desc: ['Menghapus pesan yang dikirim bot', '.delete <reply chat bot>'],
    async handler(m, {conn, zx, hasQuotedMsg, quotedMsg, botNumber}){
        if(!hasQuotedMsg) return await conn.reply(m, 'Reply pesan bot yang akan dihapus!')
        if(quotedMsg.sender != botNumber) return await conn.reply(m, 'Reply pesan bot yang akan dihapus!')
        m.getQuotedMessage().then(s => s.delete(true))
    }
}