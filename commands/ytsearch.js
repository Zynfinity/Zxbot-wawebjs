const yts = require('yt-search')
const {List, MessageMedia} = require('whatsapp-web.js')
module.exports = {
    name: ['ytsearch', 'ytdl'].map((v) => v + ' <query>'),
    cmd: ['ytsearch','yts', 'ytdl'],
    category: 'search',
    desc: ['Mencari video di Youtube', '.ytsearch <query>'],
    async handler(m, {conn,  msgId, text}){
        try{
        if(!text) return await m.reply('Mau cari apa?')
        await m.reply(global.mess.wait)
        ys = await yts(text)
        ytss = ys.all.filter(s => s.type == 'video')
        if(m.command == 'ytdl'){
            section = []
            for(let i of ytss){
                section.push({
                    title: i.title,
                    rows: [{
                        id: `.ytmp3 ${i.url}`,
                        title: `Download [ AUDIO ]`,
                        description: `${i.author.name}`
                    },{
                        id: `.ytmp4 ${i.url}`,
                        title: `Download [ VIDEO ]`,
                        description: `${i.author.name}`
                    }]
                })
            }
            list = await new List('Query : ' + text, 'Click Here', section, 'YOUTUBE SEARCH*')
            return conn.sendMessage(m.from, list, {quotedMessageId: msgId})
        }
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
        const {data} = await MessageMedia.fromUrl(ytss[0].image)
        await conn.sendMessage(m.from, yss, {quotedMessageId: msgId, extra: {
            ctwaContext: {
                title: ytss[0].title,
                description: ytss[0].description,
                thumbnail: data,
                mediaUrl: ytss[0].url,
                mediaType: 2
            }
        }})
        }catch{
            global.eror(m.command, e, m)
        }
    }
}