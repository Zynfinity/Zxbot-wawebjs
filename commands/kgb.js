module.exports = {
    name: ['kgb <tag lawan>'],
    cmd: ['kgb'],
    category: 'game',
    desc: ['Bermain kertas gunting batu'],
    group: true,
    disabled: true,
    async handler(m, {conn, args, zx, msgId, mentionedIds}){
        conn.game.kgb = conn.game.kgb ? conn.game.kgb : []
        if(args[0] == '-terima'){
            find = conn.game.kgb.find(f => f.id == m.from && f.b == m.sender)
            find.status = 'active'
            accept = `Halo @${find.a.split('@')[0]}, @${find.b.split('@')[0]}, silahkan cek Private chat dari bot untuk memulai permainan!`
            conn.sendMessage(m.from, accept, {quotedMessageId: msgId, mentions: [await conn.getContactById(find.a), await conn.getContactById(find.b)]})
        }
        if(mentionedIds == '') return m.reply('Tag lawan main anda')
        row = [{
            id: '.kgb -terima',
            title: 'Terima',
            description: 'Menerima tantangan'
        },{
            id: '.kgb -tolak',
            title: 'Tolak',
            description: 'Menolak tantangan'
        }]
        conn.game.kgb.push({
            id: m.from,
            a: m.sender,
            b: mentionedIds[0],
            status: 'waiting'
        })
        await conn.sendList(m.from, 'KERTAS, GUNTING, BATU', `Halo @${mentionedIds[0].split('@')[0]}, @${m.sender.split('@')[0]} menantang anda untuk bermain kertas, gunting, batu\nKlik tombol dibawah!`, row, 'Click Here', {quotedMessageId: msgId, mentions: [await conn.getContactById(m.sender), await conn.getContactById(mentionedIds[0])]})
    }
}