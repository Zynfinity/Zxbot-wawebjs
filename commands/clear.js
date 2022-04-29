module.exports = {
    name: ['clear'],
    cmd: ['clear', 'clearmsg'],
    category: 'owner',
    owner: true,
    async handler(m, {conn}){
        m.reply('Clearing Messages')
        chats = await conn.getChats()
        id = chats.map(c => c.id._serialized)
        for(let i=0; i<id.length; i++){
            chat = await conn.getChatById(id[i])
            chat.clearMessages()
            if(i + 1 == id.length) m.reply('Clear Messages Complete')
        }
    }
}