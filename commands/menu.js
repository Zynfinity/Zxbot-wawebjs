const { MessageMedia } = require('whatsapp-web.js')
const {toTimer} = require('../lib/tools')
module.exports = {
    name: ['menu'].map((v) => v + ''),
    cmd: /^(menu)$/i,
    category: 'other',
    ignored: true,
    async handler(m, {conn}){
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
        Object.values(global.plugins)
        .filter((plugin) => !plugin.disabled && !plugin.ignored && !plugin.function)
        .map((plugin) => {
            cmd.push({
            cmd: plugin.name,
            tag: plugin.category,
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
        menu = '[ Z X - B O T ]\n\n'
        menu += `${global.shp} Library : Whatsapp-Web.js\n`
        menu += `${global.shp} Runtime  : ${await toTimer(process.uptime())}\n`
        menu += `${global.shp} Command Total : ${total.length}\n`
        menu += `${global.shp} Date : ${date}\n`
        menu += `${global.shp} Time : ${time}\n\n`
        menu += `Hallo ${m._data.notifyName} *Here my command list*\n`
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
                menu += `┗━ *${l + 1}.* ${sort[l]}\n`
            }
        }
        menu += `\nKetik .help <command> untuk melihat info command`
        media = await MessageMedia.fromFilePath('./lib/media/thumb.mp4')
        conn.sendMessage(m.from, media, {caption: menu, sendVideoAsGif: true, quotedMessageId: m.msgId})
    }
}