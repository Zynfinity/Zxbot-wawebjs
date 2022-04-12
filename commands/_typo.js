const rzkyClient = require('rzkyfdlh-api')
const { sleep } = require('../lib/tools')
const token = "1ibl8r4kz37x4to6h8r3uxl472o88bmvg49822xd8779q31bck"
const rzky = new rzkyClient(token)
module.exports = {
    name: ['function_typo'],
    function: true,
    typo: true,
    async handler(m, {conn}){
        if(m.command == '') return
        pe = await Object.values(global.commands).filter(plugin => !plugin.ignored && !plugin.disabled)
        cmd = []
        pe.map(cemde => {
            cemde.cmd.map(ps => {
                cmd.push(ps)
            })
        })
        typo = await rzky.tools.detectTypo(m.command, cmd)
        if(typo.result != ''){
            if(typo.result[0].keakuratan >= '0.70'){
                m.reply(`_Mungkin yang anda maksud adalah : .*${typo.result[0].teks}*_\n\nKeakuratan : ${typo.result[0].keakuratan}\n\n_Silahkan ulang jika benar_`)
            }
        }
    }
}