const { default: axios } = require("axios")
module.exports = {
    name: ['ssweb <url>'],
    cmd: ['ssweb'],
    category: 'other',
    desc: ['Menangkap tampilan web', '.ssweb <url>'],
    async handler(m, {conn, text, msgId}){
        try{
            if(!text) return m.reply('Masukan parameter url!')
            if(!m.isUrl(text)) return m.reply(mess.errorlink)
            await m.reply(mess.wait)
            const {data} = await axios.get(`https://shot.screenshotapi.net/screenshot?&url=${text}&full_page=true&output=json&file_type=png&dark_mode=true&wait_for_event=load`)
            await conn.sendFileFromUrl(m.from, data.screenshot, {ctwa: {type: 'link'}, quotedMessageId: msgId, sendMediaAsDocument: true})
        }catch(e){
            global.eror(m.command, e, m)
        }
    }
}