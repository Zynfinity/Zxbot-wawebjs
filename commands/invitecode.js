module.exports = {
    name: ['linkgc'].map((v) => v + ''),
    cmd: /^(linkgc)$/i,
    category: 'group',
    desc: ['Menampilkan link group', '.link'],
    group: true,
    botAdmin: true,
    async handler(m, {conn, zx}){
        try{
            ling = await zx.getInviteCode()
            zx.sendMessage('https://chat.whatsapp.com/' + ling + `\nLink group ${zx.name}`, {quotedMessageId: m.msgId, linkPreview: true})
        }catch(e){
            global.eror(global.command, e, m)
        }
    }
}