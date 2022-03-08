const {igstalk} = require('../lib/scraper')
module.exports = {
    name: ['igstalk'].map((v) => v + ' <username>'),
    cmd: /^(igstalk)$/i,
    category: 'stalk',
    desc: ['Menampilkan profil instagram berdasarkan username', '.igstalk <username>'],
    async handler(m, {conn, text}){
        try{
            if(!text) return m.reply('Usernamenya mana?')
            await m.reply(global.mess.wait)
            stalk = await igstalk(text)
            stalkt = `*I N S T A G R A M  S T A L K*\n\n`
            stalkt += `${global.shp} Username : ${stalk.username} ${stalk.verified ? '✅' : ''}\n`
            stalkt += `${global.shp} Fullname : ${stalk.fullname}\n`
            stalkt += `${global.shp} Followers : ${stalk.followers}\n`
            stalkt += `${global.shp} Followed : ${stalk.follow}\n`
            stalkt += `${global.shp} Bio : ${stalk.bio}\n`
            stalkt += `${global.shp} Url : https://www.instagram.com/${stalk.username}/`
            await conn.sendFileFromUrl(m.from, stalk.thumbnail, {caption: stalkt, quotedMessageId: m.msgId})
        }catch(e){
            global.eror(global.command, e, m)
        }
    }
}