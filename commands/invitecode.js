module.exports = {
    name: ['linkgc'].map((v) => v + ''),
    cmd: ['linkgc'],
    category: 'group',
    desc: ['Menampilkan link group', '.link'],
    group: true,
    botAdmin: true,
    async handler(m, {conn,  msgId, zx}){
        try{
            ling = await zx.getInviteCode()
            zx.sendMessage('https://chat.whatsapp.com/' + ling + `\nLink group ${zx.name}`, {quotedMessageId: msgId, linkPreview: true})
        }catch(e){
            global.eror(m.m.command, e, m)
        }
    }
}