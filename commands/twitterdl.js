const { twitterdl2 } = require("../lib/scraper")
module.exports = {
    name: ['twitter'].map((v) => v + ' <link>'),
    cmd: ['twitter','twitterdl'],
    category: 'downloader',
    desc: ['Mendownload media dari twitter', '.twitter <link>'],
    async handler(m, {conn,  msgId, zx, text}){
        try{
            if(!text) return await m.reply('Linknya mana?')
            if(!m.isUrl(text)) return await m.reply(global.mess.errorlink)
            await m.reply(global.mess.wait)
            twitterdl2(text).then(async res => {
                twitter = '*T W I T T E R  D O W N L O A D E R*\n\n'
                twitter += `${global.shp} Username : ${res.username}\n`
                twitter += `${global.shp} Caption : ${res.caption}`
                await conn.sendFileFromUrl(m.from, res.hd, {caption: twitter, quotedMessageId: msgId})
            })
        }catch(e){
            global.eror(m.m.command, e, m)
        }
    }
}