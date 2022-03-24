const { randomtt } = require("../lib/scraper")
const { getBuffer, kapitalisasiKata } = require("../lib/tools")
module.exports = {
    name: ['asupan'].map((v) => v + ''),
    cmd: ['asupan'],
    category: 'other',
    //disabled: true,
    async handler(m, {conn,  msgId, text}){
        const dbs = require('../lib/database/database')
        await m.reply(global.mess.wait)
        try{
            user = await dbs.showdata('asupan')
            userr = user[Math.floor(Math.random() * user.length)].user
            randomtt(userr).then(async res => {
                array = Object.entries(res)
                asupan = `${global.shp} *ASUPAN*\n`
                for(let i of array){
                    if(i[0] == 'videourl') ''
                    else  asupan += `├ ${await kapitalisasiKata(i[0].split('_')[0])} : ${i[1]}\n`
                }
                asupan += '└'
                getBuffer(res.videourl).then(async x => await conn.sendFileFromBuffer(m.from, x, 'video/mp4', {caption: asupan, quotedMessageId: msgId}))
            })
        }catch(e){
            global.eror(m.command, e, m)
        }
    }
}