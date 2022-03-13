const {db} = require('../lib/database/database')
const dbwelkom = db.collection('welcome')
const dbleft = db.collection('left')
module.exports = {
    name: ['welcome', 'left'].map((v) => v + ' <query>'),
    cmd: /^(welcome|left)$/i,
    category: 'group',
    desc: ['Menyambut member yang keluar/masuk', '.@command <on/off>'],
    group: true,
    admin: true,
    async handler(m, {conn, args, command}){
        try{
            succsess = command == 'welcome' ? args[0] == 'on' ? '_*Welcome berhasil diaktifkan diGroup ini!*_' : '_*Welcome berhasil dinonaktifkan diGroup ini!*_' : args[0] == 'on' ? '_*Left berhasil diaktifkan diGroup ini!*_' : '_*Left berhasil dinonaktifkan diGroup ini!*_'
            dbl = command == 'welcome' ? args[0] == 'on' ? '_*Welcome sudah diaktifkan sebelumnya diGroup ini!*_' : '_*Welcome sudah dinonaktifkan sebelumnya diGroup ini!*_' : args[0] == 'on' ? '_*Left sudah diaktifkan sebelumnya diGroup ini!*_' : '_*Left sudah dinonaktifkan sebelumnya diGroup ini!*_' 
            if(args[0] == 'on'){
                data = command == 'welcome' ? await dbwelkom.findOne({id: m.from}) : await dbleft.findOne({id: m.from})
                if(data != null){
                    if(data.status) return m.reply(dbl)
                    console.log('p')
                    command == 'welcome' ? await dbwelkom.updateOne({
                        id: m.from
                    },
                    {
                        $set: {
                            status: true
                        }
                    }) : await dbleft.updateOne({
                        id: m.from
                    },
                    {
                        $set: {
                            status: true
                        }
                    })
                }
                if(data == null){
                    command == 'welcome' ? await dbwelkom.insertOne({
                        id: m.from,
                        status: true
                    }) : await dbleft.insertOne({
                        id: m.from,
                        status: true
                    })
                }
                m.reply(succsess)
            }
            else if(args[0] == 'off'){
                data = command == 'welcome' ? await dbwelkom.findOne({id: m.from}) : await dbleft.findOne({id: m.from})
                if(data == null) return m.reply(dbl)
                if(!data.status) return m.reply(dbl)
                command == 'welcome' ? await dbwelkom.updateOne({
                    id: m.from
                },
                {
                    $set: {
                        status: false
                    }
                }) : await dbleft.updateOne({
                    id: m.from
                },
                {
                    $set: {
                        status: false
                    }
                })
                m.reply(succsess)
            }
        }catch(e){
            global.eror(global.command, e, m)
        }
    }
}