const { mediafire } = require("../lib/scraper")
module.exports = {
    name: ['mediafire <link>'],
    cmd: ['mediafire', 'mediafiredl'],
    category: 'downloader',
    desc: ['Mendownload media dari mediafire', '.mediafire <link>'],
    async handler(m, {conn, text, msgId}){
        try{
            if(!text) return m.reply('Masukkan linknya!')
            if(!m.isUrl(text)) return m.reply(mess.errorlink)
            await m.reply(mess.wait)
            const mfire = await mediafire(text)
            if(!mfire.status) return m.reply('Media tidak valid!')
            await m.reply(await tools.parseResult('MEDIAFIRE', mfire))
            await conn.sendFileFromUrl(m.from, mfire.link, {sendMediaAsDocument: true, quotedMessageId: msgId})
        }catch(e){
            global.eror(m.command, e, m)
        }
    }
}