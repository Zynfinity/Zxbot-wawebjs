const { exec } = require('child_process')
const { toAudio } = require('../lib/converter')
module.exports = {
    name: ['tomp3'].map((v) => v + ' <reply video>'),
    cmd: ['tomp3','toaudio'],
    category: 'convert',
    desc: ['Mengubah video menjadi audio', '.@m.command <reply video>'],
    async handler(m, {conn,  msgId, quotedMsg, hasQuotedMsg}){
        try{
            if(!hasQuotedMsg || quotedMsg.type != 'video') return await m.reply('reply videonya!')
            await m.reply(global.mess.wait)
            quot = await m.getQuotedMessage()
            down = await quot.downloadMedia()
            buff = await Buffer.from(down.data, 'base64')
            audio = await toAudio(buff, 'mp4')
            await conn.sendFileFromBuffer(m.from, audio, 'audio/mpeg', {quotedMessageId: msgId})
        }catch(e){
            global.eror(m.commands, e, m)
        }
    }
}