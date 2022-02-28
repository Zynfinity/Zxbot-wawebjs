const {exec} = require('child_process')
module.exports = {
    name: ['exec'].map((v) => v + ' < Your Code >'),
    cmd: /^(exec|ex)$/i,
    category: 'owner',
    owner: true,
    async handler(m, {conn, q}){
        if(!q) return conn.reply(m.from, 'Masukkan Codenya!', m.id)
        exec(q, (err, stdout) => {
            if(err) return conn.reply(m.from, String(err), m.id)
            conn.reply(m.from, stdout, m.id)
        })
    }
}