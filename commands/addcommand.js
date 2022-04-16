const fs = require('fs')
module.exports = {
    name: ['addcommand'].map((v) => v + ' <reply code command>'),
    cmd: ['addcommand','addfitur','addcmd'],
    category: 'owner',
    desc: ['Menambahkan command secara langsung lewat pesan', '.addm.command <reply code command>'],
    owner: true,
    async handler(m, {conn,  msgId, quotedMsg, text}){
        if(!quotedMsg) return await m.reply('reply codenya!')
        await fs.writeFileSync('./commands/'+ text, quotedMsg.body)
        m.reply('Sukses menambahkan command ' + text)
    }
}