const {db} = require('../lib/database/database')
const dbwelkom = db.collection('welcome')
const dbleft = db.collection('left')
module.exports = {
    name: ['setwelcome', 'setleft'].map((v) => v + ' <text>'),
    cmd: /^(setwelcome|setleft)$/i,
    category: 'group',
    desc: ['Mengganti kata kata pada welcome/left', '.@command <text>\n*Note : @user (Mention)\n@subject (Judul Grup)\n@desc (Deskripsi Grup)'],
    async handler(m, {conn, text}){
        if(!text) return conn.reply(m, 'textnya mana?')
        try{
            succsess = command == 'setwelcome' ? 'Welcome berhasil diatur\n@user (Mention)\n@subject (Judul Grup)\n@desc (Deskripsi Grup)' : 'Left berhasil diatur\n@user (Mention)\n@subject (Judul Grup)\n@desc (Deskripsi Grup)'
            if(command == 'setwelcome' ? await dbwelkom.findOne({id: m.from}) == null : await dbleft.findOne({id: m.from}) == null) {
                command == 'setwelcome' ? await dbwelkom.insertOne({
                    id: m.from,
                    status: false,
                    text: text
                }) : await dbleft.insertOne({
                    id: m.from,
                    status: false,
                    text: text
                })
                return conn.reply(m, succsess)
            }
            command == 'setwelcome' ? await dbwelkom.updateOne({
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
            conn.reply(m, succsess)
        }catch(e){
            global.eror(global.command, e, m)
        }
    }
}