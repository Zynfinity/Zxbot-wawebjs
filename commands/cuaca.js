module.exports = {
    name: ['cuaca'].map((v) => v + ' <tempat>'),
    cmd: ['cuaca','infocuaca'],
    category: 'information',
    desc: ['Menampilkan prakiraan cuaca berdasarkan tempat/daerah', '.cuaca <tempat>'],
    async handler(m, {conn,  msgId, text}){
        try{
            if(!text) return await m.reply('Masukkan nama derah/tempat!')
            await m.reply(global.mess.wait)
            scrapp.cuaca(text).then(async res => {
                m.reply(await tools.parseResult('I N F O  C U A C A', res))
            })
        }catch(e){
            global.eror(m.command, e, m)
        }
    }
}