const { default: axios } = require('axios')
module.exports = {
    name: ['igstalk', 'tiktokstalk', 'githubstalk'].map((v) => v + ' <username>'),
    cmd: ['igstalk', 'tiktokstalk', 'githubstalk'],
    category: 'stalk',
    desc: ['Menampilkan profil Sosial Media berdasarkan username', '.@command <username>'],
    async handler(m, {conn,  msgId, text}){
        try{
            if(!text) return await m.reply('Usernamenya mana?')
            await m.reply(global.mess.wait)
            if(m.command == 'igstalk'){
                stalk = await ig.fetchUser(text)
                await conn.sendFileFromUrl(m.from, stalk.hd_profile_pic_url_info.url, {caption: await tools.parseResult('INSTAGRAM STALK', stalk, {delete: ['hd_profile_pic_url_info']}), quotedMessageId: msgId})
            }
            else if(m.command == 'tiktokstalk'){
                stalk = await axios.get('https://www.tiktok.com/node/share/user/@' + text, {
                    headers:{
                        'user-agent': 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Safari/537.36'
                    }
                })
                if(stalk.data.statusCode != 0) return m.reply('User tidak ditemukan')
                user = stalk.data.userInfo
                stalkt = `T I K T O K  S T A L K\n\n`
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
            else{
                stalk = await scrapp.ghuser(text)
                if(!stalk.status) return m.reply(stalk)
                await conn.sendFileFromUrl(m.from, stalk.user.avatarUrl, {quotedMessageId: msgId, caption: await tools.parseResult('GITHUB STALK', stalk.user, {delete: ['avatarUrl']})})
            }
        }catch(e){
            if(String(e).includes('404')) return m.reply('User not found')
            global.eror(m.command, e, m)
        }
    }
}