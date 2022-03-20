const {cuaca} = require('../lib/scraper')
module.exports = {
    name: ['cuaca'].map((v) => v + ' <tempat>'),
    cmd: ['cuaca','infocuaca'],
    category: 'information',
    desc: ['Menampilkan prakiraan cuaca berdasarkan tempat/daerah', '.cuaca <tempat>'],
    async handler(m, {conn,  msgId, text}){
        try{
            if(!text) return await m.reply('Masukkan nama derah/tempat!')
            await m.reply(global.mess.wait)
            cuaca(text).then(res => {
                array = Object.entries(res)
                cuacaa = '*I N F O  C U A C A*\n\n'
                for(let i of array){
                    cuacaa += `${global.shp} ${i[0]} : ${i[1]}\n`
                }
                m.reply(cuacaa)
            })
        }catch(e){
            global.eror(m.command, e, m)
        }
    }
}