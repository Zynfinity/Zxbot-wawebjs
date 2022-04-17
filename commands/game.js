const fs = require('fs')
module.exports = {
    name: ['game'].map((v) => v),
    cmd: ['game'],
    category: 'group',
    desc: ['Mengaktifkan mode game di group'],
    group: true,
    admin: true,
    async handler(m, {conn, zx, args}){
        data = JSON.parse(fs.readFileSync('./lib/json/data.json'))
        if(args[0] == 'on'){
            if(data.game.includes(m.from)) return m.reply('Game Mode telah diaktifkan sebelumnya')
            data.game.push(m.from)
            await fs.writeFileSync('./lib/json/data.json', JSON.stringify(data))
            m.reply('*_Game Mode Diaktifkan digroup ini_*')
        }else{
            if(!data.game.includes(m.from)) return m.reply('Game mode belum diaktifkan')
            index = data.game.indexOf(m.from)
            data.game.splice(index, 1)
            await fs.writeFileSync('./lib/json/data.json', JSON.stringify(data))
            m.reply('*_Game mode dinonaktifkan digroup ini_*')
        }
    }
}