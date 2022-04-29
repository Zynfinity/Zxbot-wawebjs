const fs = require('fs')
module.exports = {
    name: ['addtoxic', 'deltoxic'],
    cmd: ['addtoxic', 'deltoxic'],
    category: 'group',
    desc: ['Untuk menambahkan/mengurangi filter kata terlarang di group', '.@command <kata>'],
    admin: true,
    disabled: true,
    async handler(m, {conn, text}){
        const word = JSON.parse(fs.readFileSync('./lib/json/toxic.json'))
        if(m.command == 'addtoxic'){
            if(word[m.from] == undefined){
                word[m.from] = {
                    kata: [],
                    warning: {}
                }
                await fs.writeFileSync('./lib/json/toxic.json',JSON.stringify(word))
            }
            if(word[m.from].kata.includes(text)) return m.reply(`Kata ${text} sudah ada didalam kata terlarang!`)
            word[m.from].kata.push(text)
            await fs.writeFileSync('./lib/json/toxic.json',JSON.stringify(word))
            m.reply(`Kata ${text} berhasil dimasukkan kedalam kata terlarang`)
        }
        else{
            if(word[m.from] == undefined){
                word[m.from] = {
                    kata: [],
                    warning: {}
                }
                await fs.writeFileSync('./lib/json/toxic.json',JSON.stringify(word))
            }
            if(!word[m.from].kata.includes(text)) return m.reply(`Kata ${text} tidak ada didalam kata terlarang!`)
            word[m.from].kata.splice(word[m.from].kata.indexOf(text), 1)
            m.reply(`Kata ${text} berhasil dihapus dari kata terlarang`)
        }
    }
}