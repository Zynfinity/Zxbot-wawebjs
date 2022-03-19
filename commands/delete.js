module.exports = {
    name: ['delete'].map((v) => v + ' <reply chat bot>'),
    cmd: ['delete','del'],
    category: 'other',
    desc: ['Menghapus pesan yang dikirim bot', '.delete <reply chat bot>'],
    async handler(m, {conn,  msgId, zx, hasQuotedMsg, quotedMsg, botNumber}){
        if(!hasQuotedMsg) return await m.reply('Reply pesan bot yang akan dihapus!')
        if(quotedMsg.sender != botNumber) return await m.reply('Reply pesan bot yang akan dihapus!')
        m.getQuotedMessage().then(s => s.delete(true))
    }
}