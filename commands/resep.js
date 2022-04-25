module.exports = {
    name: ['resep <query>'],
    cmd: ['resep', 'resepmasakan'],
    category: 'search',
    desc: ['Mencari resep di situs resepkoki.id', '.@command <query>'],
    async handler(m, {conn, text, msgId}){
        try{
            if(!text) return m.reply('Mau cari resep apa?')
            await m.reply(mess.wait)
            scrapp.resepmasakan(text).then(async res => {
                if(!res.status) return m.reply(await tools.parseResult('RESEP MASAKAN', res))
                await conn.sendFileFromUrl(m.from, res.data.thumb, {caption: await tools.parseResult('RESEP MASAKAN', res.data, {delete: ['thumb']}), quotedMessageId: msgId})
            })
        }catch(e){
            global.eror(m.command, e, m)
        }
    }
}