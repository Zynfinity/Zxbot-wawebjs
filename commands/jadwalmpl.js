const { jadwalmplid } = require("../lib/scraper")
const { kapitalisasiKata, sleep } = require("../lib/tools")

module.exports = {
    name: ['jadwalmpl'].map((v) => v + ''),
    cmd: /^(jadwalmpl)$/i,
    category: 'information',
    desc: ['menampilkan jadwal mpl', '.jadwalmpl'],
    async handler(m, {conn, args}){
        try{
            mpl = `${global.shp} *Schedule && Result MPL ID S9*\n`
            jadwalmplid().then(async res => {
                console.log(res.length)
                for(let i=0; i<res.length; i++){
                        array = Object.entries(res[i])
                        console.log(array)
                        for(j of array){
                            mpl += `├ ${await kapitalisasiKata(j[0])} : ${j[1]}\n`
                        }
                        mpl += `└\n${global.shp}\n`
                }
                await sleep(3000)
                await conn.sendFileFromUrl(m.from, 'https://media.suara.com/pictures/970x544/2022/02/04/31958-ilustrasi-dan-logo-mpl-id-season-9-moonton.jpg', {caption: mpl, quotedMessageId: m.msgId})
            })
        }catch(e){
            global.eror(global.command, e, m)
        }
    }
}