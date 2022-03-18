const {gempa} = require('../lib/scraper')
const { getBuffer } = require('../lib/tools')
module.exports = {
    name: ['infogempa'].map((v) => v + ''),
    cmd: /^(infogempa|gempa)$/i,
    category: 'information',
    desc: ['Menampilkan informasi gempa terkini', '.infogempa'],
    async handler(m, {conn, msgId, text}){
        try{
            await conn.reply(m, global.mess.wait, msgId)
            gempa().then(async res => {
                array = Object.entries(res.data)
                gempaa = '*I N F O  G E M P A*\n\n'
                for(let i of array){
                    if(i[0] != 'imagemap') gempaa += `${global.shp} ${i[0].toUpperCase()} : ${i[1]}\n`
                }
                buff = await getBuffer(res.data.imagemap)
                conn.sendFileFromBuffer(m.from, buff, 'image/jpeg', {caption: gempaa, quotedMessageId: msgId})
            })
        }catch(e){
            global.eror(global.command, e, m)
        }
    }
}