const { anoboys, anoboydl } = require("../lib/scraper")
const {List} = require('whatsapp-web.js')
const { kapitalisasiKata } = require("../lib/tools")
module.exports = {
	name: ['anoboy'].map((v) => v + ' <emoji>'),
	cmd: /^(anoboy|anoboyinfo)$/i,
	category: 'search',
	desc: ['Mencari anime di web anoboy', '.anoboy <anime>'],
	async handler(m, {conn, msgId, text, command}){
		try{
            if(!text) return await conn.reply(m, 'mau cari apa?', msgId)
            await conn.reply(m, global.mess.wait, msgId)
            if(command == 'anoboy'){
                anoboys(text).then(async res => {
                    row = []
                    res.data.map(s => {
                        row.push({
                            id: `.anoboyinfo ${s.link}|${s.thumbnail}`,
                            title: s.title,
                            description: s.uptime.split('UP ')[1]
                        })
                    })
                    section = [{'title':'sectionTitle','rows':row}]
                    list = await new List('Query : ' + text, 'Click Here', section, '*ANOBOY SEARCH*')
                    await conn.sendMessage(m.from, list, {quotedMessageId: msgId})
                })
            }else{
                anoboydl(text.split('|')[0]).then(async res => {
                    ano = `${global.shp} *ANOBOY*\n`
                    for(let i of Object.entries(res)){
                        if(i[0] != 'link'){
                            ano += `├ ${await kapitalisasiKata(i[0])} : ${i[1]}\n`
                        }
                    }
                    ano += `${JSON.stringify(res.link, null, 2)}`
                    await conn.sendFileFromUrl(m.from, text.split('|')[1], {caption: ano, quotedMessageId: msgId})
                })
            }
        }catch(e){
            global.eror(global.command, e, m)
        }
	}
}