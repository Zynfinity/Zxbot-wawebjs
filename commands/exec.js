const {exec} = require('child_process')
module.exports = {
    name: ['exec'].map((v) => v + ' < Your Code >'),
    cmd: /^(exec|ex)$/i,
    category: 'owner',
    owner: true,
    async handler(m, {conn, q}){
        if(!q) return m.reply('Masukkan Codenya!')
        exec(q, (err, stdout) => {
            if(err) return m.reply(String(err))
            m.reply(stdout)
        })
    }
}