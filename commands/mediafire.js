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
            const mefire = await caliph.downloader.mediafire(text)
            const mfire = mefire.result
            if(mefire.status != 200) return m.reply(mefire)
            await m.reply(await tools.parseResult('MEDIAFIRE', mfire))
            tsize = mfire.filesize.includes('.') ? mfire.filesize.split('.')[1].replace(/\d/g, '') : mfire.filesize.replace(/\d/g, '')
            size = mfire.filesize.includes('.') ? mfire.filesize.split('.')[0].replace(/\D/g, '') : mfire.filesize.replace(/\D/g, '')
            if(tsize != 'KB' && size > 100 || tsize == 'GB') return m.reply('Oversized, silahkan download menggunakan link diatas')
            await conn.sendFileFromUrl(m.from, mfire.link, {sendMediaAsDocument: true, quotedMessageId: msgId})
        }catch(e){
            if(String(e) == 'Error: Invalid URL!!') return m.reply(mess.errorlink)
            global.eror(m.command, e, m)
        }
    }
}