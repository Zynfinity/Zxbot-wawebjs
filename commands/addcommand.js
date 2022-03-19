const fs = require('fs')
module.exports = {
    name: ['addm.command'].map((v) => v + ' <reply code m.command>'),
    cmd: ['addm.command','addfitur','addcmd'],
    category: 'owner',
    desc: ['Menambahkan m.command secara langsung lewat pesan', '.addm.command <reply code m.command>'],
owner: true,
    async handler(m, {conn,  msgId, quotedMsg, text}){
        if(!quotedMsg) return await m.reply('reply codenya!')
        await fs.writeFileSync('./m.commands/'+ text, quotedMsg.body)
m.reply('Sukses menambahkan m.command ' + text)
    }
}