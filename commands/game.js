const fs = require('fs')
module.exports = {
    name: ['game'].map((v) => v),
    cmd: ['game'],
    category: 'group',
    desc: ['Mengaktifkan mode game di group'],
    group: true,
    admin: true,
    //owner: true,
    async handler(m, {conn, zx, args, text}){
        dgame = JSON.parse(fs.readFileSync('./lib/json/game.json'))
        data = JSON.parse(fs.readFileSync('./lib/json/data.json'))
        if(args[0] == 'on'){
            if(text.includes('-all')){
                if(data.game) return m.reply('Mode game sudah diaktifkan sebelumnya!')
                data.game = true
                await fs.writeFileSync('./lib/json/data.json', JSON.stringify(data))
                return m.reply('*_Game Mode Diaktifkan_*')
            }
            if(dgame.game.includes(m.from)) return m.reply('Game Mode telah diaktifkan sebelumnya')
            dgame.game.push(m.from)
            await fs.writeFileSync('./lib/json/game.json', JSON.stringify(dgame))
            m.reply('*_Game Mode Diaktifkan digroup ini_*')
        }else if(args[0] == 'off'){
            if(text.includes('-all')){
                if(!data.game) return m.reply('Mode game sudah dinonaktifkan sebelumnya!')
                data.game = false
                await fs.writeFileSync('./lib/json/data.json', JSON.stringify(data))
                return m.reply('*_Game Mode Dinonaktifkan_*')
            }
            if(!dgame.game.includes(m.from)) return m.reply('Game mode belum diaktifkan')
            index = dgame.game.indexOf(m.from)
            dgame.game.splice(index, 1)
            await fs.writeFileSync('./lib/json/game.json', JSON.stringify(dgame))
            m.reply('*_Game mode dinonaktifkan digroup ini_*')
        }
        else m.reply('pilih on/off')
    }
}