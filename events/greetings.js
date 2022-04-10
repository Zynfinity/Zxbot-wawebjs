const {db} = require('../lib/database/database')
const { getBuffer, tiny } = require('../lib/tools')
const dbwelkam = db.collection('welcome')
const dbleft = db.collection('left')
const {sleep} = require('../lib/tools')
const {owner} = require('../lib/config')
const encodeurl = require('encodeurl')
const {MessageMedia} = require('whatsapp-web.js')
const bgurl = 'https://telegra.ph/file/7d38fa49c0c5aefe56366.png'
const welcome = async(anu, conn) => {
    metadata = await conn.getChatById(anu.id.remote)
    if(anu.type == 'add' && anu.author != owner && anu.id.participant == conn.info.wid._serialized){
        igroup = `#Nama : ${metadata.name}\n`
        igroup += `#Id : ${anu.id.remote}\n`
        igroup += `#Members : ${metadata.groupMetadata.participants.length}`
        conn.sendMessage(owner, `Bot Telah ditambahkan ke Group\n\n${igroup}`)
        media = await MessageMedia.fromFilePath('./lib/media/thumb.mp4')
        if(metadata.groupMetadata.participants.length <= 50){
            await conn.sendMessage(anu.id.remote, media, {sendVideoAsGif: true, caption: `Terima kasih @${anu.author.split('@')[0]} telah menambahkan ZXBOT ke Group ${metadata.name}\nTetapi mohon maaf ZXBOT hanya bisa bergabung apabila member group 50 orang keatas\n\n ~ Owner`, mentions: [await conn.getContactById(anu.author)]})
            await sleep(10000)
            metadata.leave()
        }
    }
    else if(anu.type == 'add' && anu.author == owner && anu.id.participant == conn.info.wid._serialized){
        media = await MessageMedia.fromFilePath('./lib/media/thumb.mp4')
        if(metadata.groupMetadata.participants.length <= 50){
            await conn.sendMessage(anu.id.remote, media, {sendVideoAsGif: true, caption: `Terima kasih @${anu.author.split('@')[0]} telah menambahkan ZXBOT ke Group ${metadata.name}\n\n~ Owner`, mentions: [await conn.getContactById(anu.author)]})
        }
    }
    cekdata = await dbwelkam.findOne({id: anu.id.remote})
    if(cekdata == null) return
    if(!cekdata.status) return
    user = await conn.getContactById(anu.id.participant)
    userr = `@${anu.id.participant.split('@')[0]}`
    subject = metadata.name
    desc = metadata.groupMetadata.desc
    txt = cekdata.text ? cekdata.text : `Halo @${user.id._serialized.split('@')[0]} 👋🏻\nSelamat datang di Group ${metadata.name}\nPatuhi rules group ini ya...`
    ruser = txt.replace(/@user/, userr)
    rsubject = ruser.replace(/@subject/, subject)
    greet = rsubject.replace(/@desc/, desc)
    ppuser = await user.getProfilePicUrl()
    totiny = await tiny(ppuser == undefined ? 'https://divedigital.id/wp-content/uploads/2021/10/2-min.png' : ppuser)
    await conn.sendFileFromUrl(anu.id.remote, `https://restapi-beta.herokuapp.com/api/welcome?username=${await user.getFormattedNumber()}&memcount=${metadata.groupMetadata.participants.length}&groupname=${encodeurl(metadata.name.replace(/#/, ''))}&ppurl=${totiny}&bgurl=${bgurl}`, {caption: greet, mentions: [user]})
}
const left = async(anu, conn) => {
    cekdata = await dbleft.findOne({id: anu.id.remote})
    if(cekdata == null) return
    if(!cekdata.status) return
    user = await conn.getContactById(anu.id.participant)
    metadata = await conn.getChatById(anu.id.remote)
    userr = `@${anu.id.participant.split('@')[0]}`
    subject = metadata.name
    desc = metadata.groupMetadata.desc
    txt = cekdata.text ? cekdata.text : `Selamat jalan @${user.id._serialized.split('@')[0]} 👋🏻`
    ruser = txt.replace(/@user/, userr)
    rsubject = ruser.replace(/@subject/, subject)
    greet = rsubject.replace(/@desc/, desc)
    ppuser = await user.getProfilePicUrl()
    totiny = await tiny(ppuser == undefined ? 'https://divedigital.id/wp-content/uploads/2021/10/2-min.png' : ppuser)
    await conn.sendFileFromUrl(anu.id.remote, `https://restapi-beta.herokuapp.com/api/goodbye?username=${await user.getFormattedNumber()}&memcount=${metadata.groupMetadata.participants.length}&groupname=${encodeurl(metadata.name.replace(/#/, ''))}&ppurl=${totiny}&bgurl=${bgurl}`, {caption: greet, mentions: [user]})
}
async function simulate(action, m, conn){
    simul = {
        id: {
            remote: m.from,
            participant: m.sender,
        },
    }
    if(action == 'welcome') welcome(simul, conn)
    else if(action == 'left') left(simul, conn)
}
module.exports = {welcome, left, simulate}
const fs = require('fs')
let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log("Update 'greetings.js'")
  delete require.cache[file]
  if (global.reload) console.log(global.reload())
})