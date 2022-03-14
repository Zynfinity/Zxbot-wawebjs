const yts = require('yt-search')
module.exports = {
    name: ['ytsearch'].map((v) => v + ' <query>'),
    cmd: /^(ytsearch|yts)$/i,
    category: 'search',
    desc: ['Mencari video di Youtube', '.ytsearch <query>'],
    async handler(m, {conn, text}){
        try{
        if(!text) return await conn.reply(m, 'Mau cari apa?')
        ys = await yts(text)
        ytss = ys.all.filter(s => s.type == 'video')
        yss = `*Y O U T U B E  S E A R C H*\n${global.shp} Query : ${text}\n\n`
        for(let i of ytss) {
            yss += `${global.shp} Title : ${i.title}\n`;
            yss += `${global.shp} Duration : ${i.timestamp}\n`;
            yss += `${global.shp} Views : ${i.views}\n`;
            yss += `${global.shp} Upload Date : ${i.ago}\n`;
            yss += `${global.shp} Channel : ${i.author.name}\n`;
            yss += `${global.shp} Url Channel : ${i.author.url}\n`;
            yss += `${global.shp} Url : ${i.url}\n\n\n`
        }
        await conn.sendFileFromUrl(m.from, ytss[0].thumbnail, {caption: yss, quotedMessageId: m.msgId})
        }catch{
            global.eror(global.command, e, m)
        }
    }
}