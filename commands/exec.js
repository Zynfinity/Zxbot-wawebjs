const {exec} = require('child_process')
module.exports = {
    name: ['exec'].map((v) => v + ' < Your Code >'),
    cmd: /^(exec|ex)$/i,
    category: 'owner',
    owner: true,
    async handler(m, {conn, msgId, text}){
        if(!text) return await conn.reply(m, 'Masukkan Codenya!', msgId)
        exec(text, async(err, stdout) => {
            if(err) return await conn.reply(m, String(err), msgId)
            conn.reply(m, stdout, msgId)
        })
    }
}