module.exports = {
    name: ['whatmusic <reply audio/video>'],
    cmd: ['whatmusic'],
    category: 'search',
    desc: ['mencari musik menggunakan media'],
    async handler(m, {conn, hasQuotedMsg, quotedMsg}){
        if(!hasQuotedMsg) return m.reply('reply audio/video dengan caption .whatmusic')
        if(hasQuotedMsg ? quotedMsg.type != 'audio' && quotedMsg.type != 'video' : false) return m.reply('reply audio/video dengan caption .whatmusic')
m.reply(global.mess.wait)
        quot = await m.getQuotedMessage()
        down = await quot.downloadMedia()
        whtmus = await rzky.search.whatmusic(await Buffer.from(down.data, 'base64'))
        delete whtmus.status
        m.reply(await tools.parseResult('WHATMUSIC', whtmus))
    }
}