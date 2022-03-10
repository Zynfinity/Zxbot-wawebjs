const { twitterdl } = require("../lib/scraper")
module.exports = {
    name: ['twitter'].map((v) => v + ' <link>'),
    cmd: /^(twitter|twitterdl)$/i,
    category: 'downloader',
    desc: ['Mendownload media dari twitter', '.twitter <link>'],
    async handler(m, {conn, zx, text}){
        try{
            if(!text) return m.reply('Linknya mana?')
            if(!m.isUrl(text)) return m.reply(global.mess.errorlink)
            await m.reply(global.mess.wait)
            twitterdl(text).then(async res => {
                twitter = '*T W I T T E R  D O W N L O A D E R*\n\n'
                twitter += `${global.shp} Username : ${res.data.username}\n`
                twitter += `${global.shp} Caption : ${res.data.caption}\n`
                twitter += `${global.shp} Resolusi : ${res.data.download[0].resolusi}`
                await conn.sendFileFromUrl(m.from, res.data.download[0].url, {caption: twitter, quotedMessageId: m.msgId})
            })
        }catch(e){
            global.eror(global.command, e, m)
        }
    }
}