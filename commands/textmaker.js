const {stickerMetadata} = require('../lib/config')
const { textpro } = require('../lib/textmaker')
const { getBuffer } = require('../lib/tools')
module.exports = {
    name: ['batman', 'circuit', 'neonlight', 'glitch', 'graffiti', 'text3d', 'blackpink', 'sand'].map((v) => v + ' <text>'),
    cmd: /^(batman|circuit|neonlight|glitch|graffiti|text3d|blackpink|sand)$/i,
    category: 'textmaker',
    desc: ['Memanipulasi gambar', `.@command <text>\n_Note_ : Tambahkan -s jika ingin mengirim sebagai sticker\nExample : .@command Fajar Ihsana -s`],
    async handler(m, {conn, msgId, command, args, text}){
        try{
            const tema = {
                batman:'https://textpro.me/make-a-batman-logo-online-free-1066.html',
                circuit: 'https://textpro.me/create-blue-circuit-style-text-effect-online-1043.html',
                neonlight: 'https://textpro.me/create-3d-neon-light-text-effect-online-1028.html',
                glitch: 'https://textpro.me/create-impressive-glitch-text-effects-online-1027.html',
                graffiti: 'https://textpro.me/create-wonderful-graffiti-art-text-effect-1011.html',
                text3d: 'https://textpro.me/3d-gradient-text-effect-online-free-1002.html',
                blackpink: 'https://textpro.me/create-blackpink-logo-style-online-1001.html',
                sand: 'https://textpro.me/sand-engraved-3d-text-effect-989.html'
            }
            if(!text) return await conn.reply(m, 'teksnya mana?', msgId)
            await conn.reply(m, global.mess.wait, msgId)
            pros = await textpro(tema[command], text.replace('-s', ''))
            sticker = text.includes('-s') ? true : false
            await conn.sendFileFromBuffer(m.from, await getBuffer(pros), 'image/jpeg', {
                caption: '*Done*',
                quotedMessageId: msgId,
                sendMediaAsSticker: sticker,
                ...stickerMetadata
            })
        }catch(e){
            global.eror(global.command, e, m)
        }
    }
}