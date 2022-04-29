const fs = require('fs')
module.exports = {
    name: ['antitoxic_function'],
    function: true,
    disabled: true,
    async handler(m, {conn, budy}){
        const word = JSON.parse(fs.readFileSync('./lib/json/toxic.json'))
        if(word[m.from] == undefined) return
        for(let kasar of word[m.from].kata){
            if(budy.includes(kasar)){
                if(word[m.from].warning[m.sender] == undefined){
                    word[m.from].warning[m.sender] = {
                        kata: [kasar],
                        count: 1
                    }
                }
                else{
                    word[m.from].warning[m.sender].kata.push(kasar)
                    word[m.from].warning[m.sender].count++
                }
                await fs.writeFileSync('./lib/json/toxic.json', JSON.stringify(word))
                if(word[m.from].warning[m.sender].count == 5){
                    m.reply(`Kata terlarang terdeteksi\n${global.shp} Kata : ${kasar}\n\nWarning ${word[m.from].warning[m.sender].count}/5\nAnda akan dikeluarkan oleh bot!`)
                    const chat = await conn.getChatById(m.from)
                    chat.removeParticipants([m.sender]) 
                }
                else return m.reply(`Kata terlarang terdeteksi\n${global.shp} Kata : ${kasar}\n\nWarning ${word[m.from].warning[m.sender].count}/5\n*Note: Jika warning sudah mencapai 5, maka anda akan otomatis dikeluarkan oleh bot..`)
            }
        }
    }
}