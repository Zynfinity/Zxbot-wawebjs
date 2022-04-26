module.exports = {
    name: ['antilink_function'],
    function: true,
    async handler(m, {conn, zx, budy, isBotAdmin, isAdmin}){
        if (m.type == 'chat' || m.type == 'image' || m.type == 'video'){
            const {db} = require('../lib/database/database')
            const dbanti = db.collection('groups')
            if(!zx.isGroup) return
            if(isAdmin) return
            if(isBotAdmin){
                let linkRegex = /chat.whatsapp.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i
                isGroupLink = linkRegex.exec(budy)
                linkgc = await zx.getInviteCode()
                if(isGroupLink){
                if(isGroupLink[1] == linkgc) return
                    isantilink = await dbanti.findOne({id: m.from})
                    if(isantilink != null && isantilink.antilink){
                        await m.reply('Link Group Detected\nyou will be removed from the group')
                        zx.removeParticipants([m.sender])
                    }
                }
            }
        }
    }
}