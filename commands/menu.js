const {toTimer} = require('../lib/tools')
let d = new Date(new Date() + 3600000)
module.exports = {
    name: ['menu'].map((v) => v + ''),
    cmd: /^(menu|help)$/i,
    category: 'other',
    async handler(m, {conn}){
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
        Object.values(global.plugins)
        .filter((plugin) => !plugin.disabled)
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
        menu = '[ U N I X - B O T ]\n\n'
        menu += `Hallo ${m.sender.pushname} *Here my command list*\n`
        for(let i of tags){
            menu += `\n${global.shp} ${i.toUpperCase()}\n`
            filt_cmd = cmd.filter((mek) => mek.tag == i)
            map_cmd = await filt_cmd.map((mek) => mek.cmd)
            helps = []
            for(let j of map_cmd){
                for(let k of j){
                    helps.push(k)
                }
            }
            sort = await helps.sort(function (a, b) {
                return a.length - b.length
              })
            for (let l = 0; l<sort.length; l++) {
                menu += `*${l + 1}.* ${sort[l]}\n`
            }
        }
        /*menu += `*⫹⫺ Library : @open-wa/wa-automate*
*⫹⫺ Version : 1.0*
*⫹⫺ Language : Javascript*
*⫹⫺ Runtime : ${await toTimer(process.uptime())}*
*⫹⫺ User : ${m.sender.pushname}*
*⫹⫺ Tanggal : ${date}*
*⫹⫺ Waktu : ${time}*
*⫹⫺ Author : All Contributor*
*⫹⫺ All Command : ${cmd.length - 1}*\n`*/
        conn.reply(m.from, menu, m.id)
    }
}