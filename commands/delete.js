module.exports = {
    name: ['delete'].map((v) => v + ' <reply chat bot>'),
    cmd: /^(delete|del)$/i,
    category: 'other',
    desc: ['Menghapus pesan yang dikirim bot', '.delete <reply chat bot>'],
    async handler(m, {conn, quotedMsg}){
        if(!quotedMsg) return m.reply('Reply pesan bot yang akan dihapus!')
        if(quotedMsg.sender.id != (await conn.getMe()).me._serialized) return m.reply('Reply pesan bot yang akan dihapus!')
            conn.deleteMessage(m.from, quotedMsg.id, false)
    }
}