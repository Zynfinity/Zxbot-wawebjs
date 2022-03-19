const {db} = require('../lib/database/database')
const dbwelkom = db.collection('welcome')
const dbleft = db.collection('left')
module.exports = {
    name: ['setwelcome', 'setleft'].map((v) => v + ' <text>'),
    cmd: ['setwelcome','setleft'],
    category: 'group',
    desc: ['Mengganti kata kata pada welcome/left', '.@m.command <text>\n*Note : @user (Mention)\n@subject (Judul Grup)\n@desc (Deskripsi Grup)'],
    async handler(m, {conn,  msgId, text}){
        if(!text) return await m.reply('textnya mana?')
        try{
            succsess = m.command == 'setwelcome' ? 'Welcome berhasil diatur\n@user (Mention)\n@subject (Judul Grup)\n@desc (Deskripsi Grup)' : 'Left berhasil diatur\n@user (Mention)\n@subject (Judul Grup)\n@desc (Deskripsi Grup)'
            if(m.command == 'setwelcome' ? await dbwelkom.findOne({id: m.from}) == null : await dbleft.findOne({id: m.from}) == null) {
                m.command == 'setwelcome' ? await dbwelkom.insertOne({
                    id: m.from,
                    status: false,
                    text: text
                }) : await dbleft.insertOne({
                    id: m.from,
                    status: false,
                    text: text
                })
                return await m.reply(succsess)
            }
            m.command == 'setwelcome' ? await dbwelkom.updateOne({
                id: m.from
            },
            {
                $set: {
                    text: text
                }
            }) : await dbleft.updateOne({
                id: m.from
            },
            {
                $set: {
                    text: text
                }
            })
            m.reply(succsess)
        }catch(e){
            global.eror(m.m.command, e, m)
        }
    }
}