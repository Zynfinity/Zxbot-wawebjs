const toms = require('ms')
const fs = require('fs')
const time = ['d', 'h', 'm', 's']
module.exports = {
    name: ['group'].map((v) => v + ' <open/close>'),
    cmd: ['group','gc','grup'],
    category: 'group',
    desc: ['Membuka/menutup group', '\nBiasa\n.group <open/close>\n\nAuto\n.group <open/close> 5s (5 detik)\ns = detik\nh = jam\nm = menit\nd = hari'],
    admin: true,
    botAdmin: true,
    group: true,
    async handler(m, {conn,  msgId, zx, args}){
        ddb = JSON.parse(fs.readFileSync('./lib/json/auto.json'))
        conn.auto = conn.auto ? conn.auto : {}
        if(args[0] == 'open'){
            if(!zx.groupMetadata.announce) return await m.reply('Group sudah dibuka sebelumnya')
            if(args[1]){
                auto = `Group akan otomatis ${args[0] == 'open' ? 'dibuka' : 'ditutup'} dalam waktu ${args[1]} [ ${args[1].endsWith('s') ? 'detik' : args[1].endsWith('m') ? 'menit' : args[1].endsWith('h') ? 'jam' : args[1].endsWith('d') ? 'Hari' : ''} ]`
                if(!args[1].endsWith('s') && !args[1].endsWith('h') && !args[1].endsWith('m') && !args[1].endsWith('d')) return m.reply('Format salah, silahkan ketik .help group untuk melihat cara pemakaian!')
                ddb[m.from] = {
                    id: m.from,
                    timestamp: Date.now() + await toms(args[1]),
                    action: 'open'
                }
                fs.writeFileSync('./lib/json/auto.json', JSON.stringify(ddb))
                return m.reply(auto)
            }
            await zx.setMessagesAdminsOnly(false)
            //m.reply('Berhasil membuka group!\nsekarang semua member bisa mengirim pesan!')
        }
        else if(args[0] == 'close'){
            if(zx.groupMetadata.announce) return await m.reply('Group sudah ditutup sebelumnya')
            if(args[1]){
                auto = `Group akan otomatis ${args[0] == 'open' ? 'dibuka' : 'ditutup'} dalam waktu ${args[1]} [ ${args[1].endsWith('s') ? 'detik' : args[1].endsWith('m') ? 'menit' : args[1].endsWith('h') ? 'jam' : args[1].endsWith('d') ? 'Hari' : ''} ]`
                if(!args[1].endsWith('s') && !args[1].endsWith('h') && !args[1].endsWith('m') && !args[1].endsWith('d')) return m.reply('Format salah, silahkan ketik .help group untuk melihat cara pemakaian!')
                ddb[m.from] = {
                    id: m.from,
                    timestamp: Date.now() + await toms(args[1]),
                    action: 'close'
                }
                fs.writeFileSync('./lib/json/auto.json', JSON.stringify(ddb))
                return m.reply(auto)
            }
            await zx.setMessagesAdminsOnly(true)
            //m.reply('Berhasil menutup group!\nsekarang hanya admin yang bisa mengirim pesan!')
        }
    }
}