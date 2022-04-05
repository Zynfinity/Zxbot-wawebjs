const fs = require('fs')
module.exports = {
    name: ['addstc', 'addsticker'].map((v) => v + ' <command>'),
    cmd: ['addstc', 'addsticker'],
    category: 'owner',
    desc: ['Menambahkan sticker command'],
    owner: true,
    async handler(m, {conn, hasQuotedMsg, quotedMsg, text}){
        const data = JSON.parse(fs.readFileSync('./lib/json/data.json'))
        if(m.command == 'addstc' || m.command == 'addsticker'){
            if(!hasQuotedMsg) return m.reply('Reply stickernya')
            if(!text) return m.reply('commandnya apa?')
            quot = await m.getQuotedMessage()
            data.stcmd.push({
                id: quot._data.filehash,
                cmd: text
            })
            await fs.writeFileSync('./lib/json/data.json', JSON.stringify(data))
            m.reply('Succsess menambahkan sticker dengan command ' + text)
        }
        /*else{
            if(hasQuotedMsg || quotedMsg.type == 'sticker')
        }*/
    }
}