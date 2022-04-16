const fs = require('fs')
module.exports = {
    name: ['addstc', 'delstc'].map((v) => v + ' <command>'),
    cmd: ['addstc', 'addsticker', 'delstc'],
    category: 'owner',
    desc: ['Menambahkan sticker command'],
    owner: true,
    async handler(m, {conn, hasQuotedMsg, quotedMsg, text}){
        const data = JSON.parse(fs.readFileSync('./lib/json/stickercmd.json'))
        if(m.command == 'addstc' || m.command == 'addsticker'){
            if(!hasQuotedMsg) return m.reply('Reply stickernya')
            if(!text) return m.reply('commandnya apa?')
            quot = await m.getQuotedMessage()
            data.stcmd.push({
                id: quot._data.filehash,
                cmd: text
            })
            await fs.writeFileSync('./lib/json/stickercmd.json', JSON.stringify(data))
            m.reply('Succsess menambahkan sticker dengan command ' + text)
        }
        else{
            if(!hasQuotedMsg) return m.reply('Reply stickernya')
            quot = await m.getQuotedMessage()
            index = data.indexOf({id: quot._data.filehash})
            data.stcmd.splice(index, 1)
            await fs.writeFileSync('./lib/json/stickercmd.json', JSON.stringify(data))
            m.reply('Succsess menghapus sticker')
        }
        /*else{
            if(hasQuotedMsg || quotedMsg.type == 'sticker')
        }*/
    }
}