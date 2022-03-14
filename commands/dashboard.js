const {
	showhit
} = require("../lib/database/hit")
module.exports = {
	name: ['dashboard'].map((v) => v + ''),
	cmd: /^(dashboard)$/i,
	category: 'other',
	desc: ['Melihat history command bot', '.dashboard'],
	async handler(m, {conn, prefix}) {
		const data = await showhit()
		if (data == '') return await conn.reply(m, 'Masih Kosong :v')
		let thit = data.map((total) => total.count)
		let totalhit = 0
		for (let i of thit) {
			totalhit += Number(i)
		}
        const userhit = []
        for(let i of data){
            finddata = await i.user.filter(x => x.id == m.sender)
            if(finddata != ''){
                userhit.push({
                    cmd: i.cmd,
                    count: finddata[0].count
                })
            }
        }
        totalhits = 0
        userhit.map(s => {
            totalhits += s.count
        })
		let hglobal = data.sort(function(a, b) {
			return b.count - a.count
		})
        let huser = userhit.sort(function(a, b) {
			return b.count - a.count
		})
        tu = ''
		if (userhit.length <= 5) {
			for (let i = 0; i < userhit.length; i++) {
				tu += `├ ${prefix}${userhit[i].cmd} : ${userhit[i].count}\n`
			}
		} else {
			for (let i = 0; i < 6; i++) {
				tu += `├ ${prefix}${userhit[i].cmd} : ${userhit[i].count}\n`
			}
		}
        tu += '└'
		tg = ''
		if (data.length <= 5) {
			for (let i = 0; i < data.length; i++) {
				tg += `├ ${prefix}${data[i].cmd} : ${data[i].count}\n`
			}
		} else {
			for (let i = 0; i < 6; i++) {
				tg += `├ ${prefix}${data[i].cmd} : ${data[i].count}\n`
			}
		}
        tg += '└'
        dash = `${global.shp} *DASHBOARD*\n`
        dash += `\n${global.shp} *HIT*\n`
        dash += `├ Global : ${totalhit}\n`
        dash += `└ User : ${totalhits}\n`
        dash += `\n${global.shp} *MOST COMMAND USER*\n`
        dash += tu
        dash += `\n\n${global.shp} *MOST COMMAND GLOBAL*\n`
        dash += tg
        conn.reply(m, dash)
	}
}
