const { sfilesearch, wattpad, happymod, mangatoon } = require("../lib/scraper")
module.exports = {
    name: ['sfilesearch', 'wattpad', 'happymod', 'mangatoon'].map((v) => v + ' <query>'),
    cmd: ['sfilesearch', 'wattpad', 'happymod', 'mangatoon'],
    category: 'search',
    desc: ['Mencari sesuatu di web tertentu', '.@command <query>'],
    async handler(m, {conn, msgId, text, args}){
        try{
            if(!text) return m.reply('Mau cari apa?')
            await m.reply(mess.wait)
            if(m.command == 'sfilesearch'){
                data = await sfilesearch(text)
                m.reply(await tools.parseResult('SFILE SEARCH', data))
            }
            else if(m.command == 'wattpad'){
                data = await wattpad(text)
                if(data == '') return m.reply('Cerita tidak ditemukan!')
                await conn.sendFileFromUrl(m.from, data[0].thumb, {caption: await tools.parseResult('WATTPAD SEARCH', data, {delete: ['thumb']}), quotedMessageId: msgId})
            }
            else if(m.command == 'happymod'){
                data = await happymod(text)
                if(data.data == '') return m.reply('apk tidak ditemukan!')
                await conn.sendFileFromUrl(m.from, data.data[0].thumb, {caption: await tools.parseResult('HAPPYMOD SEARCH', data.data, {delete: ['thumb']}), quotedMessageId: msgId})
            }
            else if(m.command == 'mangatoon'){
                data = await mangatoon(text)
                if(data == '') return m.reply('Manga tidak ditemukan!')
                await conn.sendFileFromUrl(m.from, data[0].comic_thumb, {caption: await tools.parseResult('MANGATOON SEARCH', data, {delete: ['status', 'creator', 'comic_thumb']}), quotedMessageId: msgId})
            }
        }catch(e){
            global.eror(m.command, e, m)
        }
    }
}