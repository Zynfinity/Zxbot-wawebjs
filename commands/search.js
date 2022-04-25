const { sfilesearch, wattpad, happymod, mangatoon, playstore } = require("../lib/scraper")
module.exports = {
    name: ['wattpad', 'happymod', 'mangatoon', 'playstore'].map((v) => v + ' <query>'),
    cmd: ['wattpad', 'happymod', 'mangatoon', 'playstore'],
    category: 'search',
    desc: ['Mencari sesuatu di web tertentu', '.@command <query>'],
    async handler(m, {conn, msgId, text, args}){
        try{
            if(!text) return m.reply('Mau cari apa?')
            await m.reply(mess.wait)
            if(m.command == 'wattpad'){
                getdata = await wattpad(text)
                if(getdata == '') return m.reply('Cerita tidak ditemukan!')
                await conn.sendFileFromUrl(m.from, getdata[0].thumb, {caption: await tools.parseResult('WATTPAD SEARCH', getdata, {delete: ['thumb']}), quotedMessageId: msgId})
            }
            else if(m.command == 'happymod'){
                getdata = await happymod(text)
                if(getdata.data == '') return m.reply('apk tidak ditemukan!')
                await conn.sendFileFromUrl(m.from, getdata.data[0].thumb, {caption: await tools.parseResult('HAPPYMOD SEARCH', getdata.data, {delete: ['thumb']}), quotedMessageId: msgId})
            }
            else if(m.command == 'mangatoon'){
                getdata = await mangatoon(text)
                if(getdata == '') return m.reply('Manga tidak ditemukan!')
                await conn.sendFileFromUrl(m.from, getdata[0].comic_thumb, {caption: await tools.parseResult('MANGATOON SEARCH', getdata, {delete: ['status', 'creator', 'comic_thumb']}), quotedMessageId: msgId})
            }
            else if(m.command == 'playstore'){
                getdata = await playstore(text)
                if(!getdata.status) return m.reply('Apk tidak ditemukan')
                await m.reply(await tools.parseResult('PLAY STORE SEARCH', getdata.result))
            }
        }catch(e){
            global.eror(m.command, e, m)
        }
    }
}