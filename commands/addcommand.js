const fs = require('fs')
module.exports = {
    name: ['addcommand'].map((v) => v + ' <reply code command>'),
    cmd: /^(addcommand|addfitur)$/i,
    category: 'owner',
    desc: ['Menambahkan command secara langsung lewat pesan', '.addcommand <reply code command>'],
owner: true,
    async handler(m, {conn, quotedMsg, text}){
        if(!quotedMsg) return m.reply('reply codenya!')
        fs.writeFileSync('./commands/'+ text, quotedMsg.body).then(async p=> m.reply('Sukses menambahkan command ' + text))
    }
}