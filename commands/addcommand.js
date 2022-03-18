const fs = require('fs')
module.exports = {
    name: ['addcommand'].map((v) => v + ' <reply code command>'),
    cmd: /^(addcommand|addfitur|addcmd)$/i,
    category: 'owner',
    desc: ['Menambahkan command secara langsung lewat pesan', '.addcommand <reply code command>'],
owner: true,
    async handler(m, {conn, msgId, quotedMsg, text}){
        if(!quotedMsg) return await conn.reply(m, 'reply codenya!')
        await fs.writeFileSync('./commands/'+ text, quotedMsg.body)
conn.reply(m, 'Sukses menambahkan command ' + text, msgId)
    }
}