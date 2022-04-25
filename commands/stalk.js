const { default: axios } = require('axios')
module.exports = {
    name: ['igstalk', 'tiktokstalk'].map((v) => v + ' <username>'),
    cmd: ['igstalk', 'tiktokstalk'],
    category: 'stalk',
    desc: ['Menampilkan profil Sosial Media berdasarkan username', '.@command <username>'],
    async handler(m, {conn,  msgId, text}){
        try{
            if(!text) return await m.reply('Usernamenya mana?')
            await m.reply(global.mess.wait)
            if(m.command == 'igstalk'){
                stalk = await scrapp.igstalk(text)
                stalkt = `*I N S T A G R A M  S T A L K*\n\n`
                stalkt += `${global.shp} Username : ${stalk.username} ${stalk.verified ? '✅' : ''}\n`
                stalkt += `${global.shp} Fullname : ${stalk.fullname}\n`
                stalkt += `${global.shp} Followers : ${stalk.followers}\n`
                stalkt += `${global.shp} Followed : ${stalk.follow}\n`
                stalkt += `${global.shp} Bio : ${stalk.bio}\n`
                stalkt += `${global.shp} Url : https://www.instagram.com/${stalk.username}/`
                await conn.sendFileFromUrl(m.from, stalk.thumbnail, {caption: stalkt, quotedMessageId: msgId})
            }
            else{
                stalk = await axios.get('https://www.tiktok.com/node/share/user/@' + text, {
                    headers:{
                        'user-agent': 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Safari/537.36'
                    }
                })
                if(stalk.data.statusCode != 0) return m.reply('User tidak ditemukan')
                user = stalk.data.userInfo
                stalkt = `*T I K T O K  S T A L K*\n\n`
                stalkt += `${global.shp} Id : ${user.user.id}\n`
                stalkt += `${global.shp} Username : ${user.user.uniqueId}\n`
                stalkt += `${global.shp} Nickname : ${user.user.nickname}\n`
                stalkt += `${global.shp} Verified : ${user.user.verified}\n`
                stalkt += `${global.shp} Follower : ${user.stats.followerCount}\n`
                stalkt += `${global.shp} Following : ${user.stats.followingCount}\n`
                stalkt += `${global.shp} Like : ${user.stats.heartCount}\n`
                stalkt += `${global.shp} Video : ${user.stats.videoCount}`
                await conn.sendFileFromUrl(m.from, user.user.avatarLarger, {caption: stalkt, quotedMessageId: msgId})
            }
        }catch(e){
            global.eror(m.command, e, m)
        }
    }
}