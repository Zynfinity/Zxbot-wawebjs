module.exports = {
    name: ['q'].map((v) => v + ' <reply pesan>'),
    cmd: ['q','quoted'],
    category: 'other',
    async handler(m, {conn,  msgId, quotedMsg, hasQuotedMsg}){
        try{
            if(!hasQuotedMsg) return await m.reply('reply pesannya!')
            quot = await m.getQuotedMessage()
            quott = await quot.getQuotedMessage()
            if(quott == undefined) return m.reply('Pesan tidak mengandung reply!')
            await quott.forward(m.from)
        }catch(e){
if(String(e).includes("reading 'asMms'")) return m.reply('Pesan tidak ditemukan\nmungkin karena telah dihapus:)')
            global.eror(m.command, e, m)
        }
    }
}