const { twitterdl } = require("../lib/scraper")
module.exports = {
    name: ['twitter'].map((v) => v + ' <link>'),
    cmd: /^(twitter|twitterdl)$/i,
    category: 'downloader',
    desc: ['Mendownload media dari twitter', '.twitter <link>'],
    async handler(m, {conn, msgId, zx, text}){
        try{
            if(!text) return await conn.reply(m, 'Linknya mana?', msgId)
            if(!m.isUrl(text)) return await conn.reply(m, global.mess.errorlink, msgId)
            await conn.reply(m, global.mess.wait, msgId)
            twitterdl(text).then(async res => {
                twitter = '*T W I T T E R  D O W N L O A D E R*\n\n'
                twitter += `${global.shp} Username : ${res.data.username}\n`
                twitter += `${global.shp} Caption : ${res.data.caption}\n`
                twitter += `${global.shp} Resolusi : ${res.data.download[0].resolusi}`
                await conn.sendFileFromUrl(m.from, res.data.download[0].url, {caption: twitter, quotedMessageId: msgId})
            })
        }catch(e){
            global.eror(global.command, e, m)
        }
    }
}