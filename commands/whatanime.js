const axios = require('axios')
const tools = require('../lib/tools')
const { telegraph, kapitalisasiKata, getBuffer, tiny } = require('../lib/tools')
module.exports = {
    name: ['whatanime <reply/kirim gambar>'],
    cmd: ['whatanime'],
    category: 'anime',
    desc: ['Mencari anime berdasarkan potongan gambar', '.whatanime <reply/kirim gambar>'],
    async handler(m, {conn, hasQuotedMsg, msgId, quotedMsg}){
        try{
            const what = async(url) => {
                const {data} = await axios.get(`https://api.trace.moe/search?url=${url}`)
            return data
            }
            if(hasQuotedMsg && quotedMsg.type == 'image'){
                m.reply(global.mess.wait)
                quot = await m.getQuotedMessage()
                down = await quot.downloadMedia()
                url = await telegraph(await Buffer.from(down.data, 'base64'))
                trace = await what(url)
                if(trace.result == '') return m.reply('Anime tidak ditemukan')
                image = trace.result[0].image
                delete trace.result[0].image
                trace.result[0].video = await tiny(trace.result[0].video)
                await conn.sendFileFromUrl(m.from, image, {caption: await tools.parseResult('*WHAT ANIME*', trace.result[0]), quotedMessageId: msgId})
            }
            else if(!hasQuotedMsg && m.type == 'image'){
                m.reply(global.mess.wait)
                down = await m.downloadMedia()
                url = await telegraph(await Buffer.from(down.data, 'base64'))
                trace = await what(url)
                if(trace.result == '') return m.reply('Anime tidak ditemukan')
                whtanim = `*WHAT ANIME*\n\n`
                for(let i of Object.entries(trace.result[0])){
                    if(i[0] != 'image' && i[0] != 'video'){
                        whtanim += `${global.shp} ${await kapitalisasiKata(i[0])} : ${i[1]}\n`
                    }
                }
                whtanim += `${global.shp} Video : ${await tiny(trace.result[0].video)}`
                await conn.sendFileFromUrl(m.from, trace.result[0].image, {caption: whtanim, quotedMessageId: msgId})
            }
            else m.reply('Reply/kirim gambar dengan caption .whatanime ')
        }catch(e){
            global.eror(m.command, e, m)
        }
    }
}