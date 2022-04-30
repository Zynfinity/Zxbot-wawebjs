const { MessageMedia } = require('whatsapp-web.js')
const {toTimer} = require('../lib/tools')
const fs = require('fs')
module.exports = {
    name: ['menu'].map((v) => v + ''),
    cmd: ['menu'],
    category: 'other',
    ignored: true,
    async handler(m, {conn,  msgId, prefix}){
        let d = new Date(new Date() + 3600000)
        let date = d.toLocaleDateString('id', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        })
        let time = d.toLocaleTimeString('id', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        })
        cmd = []
        total = []
        pe = await Object.values(global.commands).filter(plugin => !plugin.ignored || plugin.disabled)
        Array.from(pe).map(plugin => {
            cmd.push({
                cmd: plugin.name,
                tag: plugin.disabled ? 'Disabled' : plugin.category,
            })
        })
        ye = await Object.values(global.functions).filter(plugin => !plugin.disabled && plugin.menu)
        Array.from(ye).map(plugin => {
            cmd.push({
                cmd: plugin.name,
                tag: plugin.disabled ? 'Disabled' : plugin.category,
            })
        })
        map_tag = cmd.map((mek) => mek.tag)
        sort_tag = await map_tag.sort()
        tag_data = new Set(sort_tag)
        tags = [...tag_data]
        cmd.map(mk => mk.cmd).map(mkk => {
            mkk.map(pe => {
                total.push(pe)
            })
        })
        //menu = `            *[ Z X - B O T ]*\n\n`
        menu = `${global.shp} Library : Whatsapp-Web.js\n`
        menu += `${global.shp} Api's : https://www.npmjs.com/package/zxy-api\n`
        menu += `${global.shp} Blog : https://ihsanafajar.blogspot.com\n`
        menu += `${global.shp} Group Bot : https://bit.ly/3LZ5LcN\n`
        menu += `${global.shp} Runtime  : ${await toTimer(process.uptime())}\n`
        menu += `${global.shp} Command Total : ${total.length}\n`
        menu += `${global.shp} Prefix : [ ${prefix} ]\n`
        menu += `${global.shp} Date : ${date}\n`
        menu += `${global.shp} Time : ${time}\n\n`
        menu += `Hallo ${m._data.notifyName} Here my command list\n`
        for(let i of tags){
            helps = []
            menu += `\n${global.shp} ${i.toUpperCase()}\n`
            filt_cmd = cmd.filter((mek) => mek.tag == i)
            map_cmd = await filt_cmd.map((mek) => mek.cmd)
            for(let j of map_cmd){
                for(let k of j){
                    helps.push(k)
                    total.push(k)
                }
            }
            sort = await helps.sort(function (a, b) {
                return a.length - b.length
              })
            for (let l = 0; l<sort.length; l++) {
                menu += `*${l + 1}*. _${sort[l]}_\n`
            }
        }
        menu += `\n_*Note : Ketik .help <command> untuk melihat info command_\n_Berikan jeda 5 detik dalam memakai bot_`
        //media = await fs.readFileSync('./lib/media/thumb.jpg')
        const thumb = await MessageMedia.fromUrl('https://i.ytimg.com/vi/XB5mB1WuzbM/hqdefault.jpg')
        await conn.sendMessage(m.from, menu, {
            quotedMessageId: msgId,
            extra: {
                ctwaContext: {
                    title: '🤖  𝙕𝙓𝘽𝙊𝙏 𝙈𝙐𝙇𝙏𝙄𝘿𝙀𝙑𝙄𝘾𝙀',
                    description: `Whatsapp-Web Version : ${await conn.getWWebVersion()}`,
                    thumbnail: thumb.data,
                    mediaType: 2,
                    mediaUrl: 'https://youtube.com/watch?v=XB5mB1WuzbM'
                }
            }
        })
    }
}