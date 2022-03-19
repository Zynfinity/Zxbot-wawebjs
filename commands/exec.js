const {exec} = require('child_process')
module.exports = {
    name: ['exec'].map((v) => v + ' < Your Code >'),
    cmd: ['exec','ex'],
    category: 'owner',
    owner: true,
    async handler(m, {conn,  msgId, text}){
        if(!text) return await m.reply('Masukkan Codenya!')
        exec(text, async(err, stdout) => {
            if(err) return await m.reply(String(err))
            m.reply(stdout)
        })
    }
}