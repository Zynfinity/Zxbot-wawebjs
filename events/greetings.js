const {db} = require('../lib/database/database')
const { getBuffer, tiny } = require('../lib/tools')
const dbwelkam = db.collection('welcome')
const dbleft = db.collection('left')
const {m} = require('../index')
const bgurl = 'https://images3.alphacoders.com/117/thumb-1920-1174531.jpg'
const welcome = async(anu, conn) => {
    cekdata = await dbwelkam.findOne({id: anu.id.remote})
    if(cekdata == null) return
    if(!cekdata.status) return
    user = await conn.getContactById(anu.id.participant)
    metadata = await conn.getChatById(anu.id.remote)
    userr = `@${anu.id.participant.split('@')[0]}`
    subject = metadata.name
    desc = metadata.groupMetadata.desc
    txt = cekdata.text ? cekdata.text : `Halo @${user.id._serialized.split('@')[0]} 👋🏻\nSelamat datang di Group ${metadata.name}\nPatuhi rules group ini ya...`
    ruser = txt.replace(/@user/, userr)
    rsubject = ruser.replace(/@subject/, subject)
    greet = rsubject.replace(/@desc/, desc)
    ppuser = await user.getProfilePicUrl()
    totiny = await tiny(ppuser == undefined ? 'https://divedigital.id/wp-content/uploads/2021/10/2-min.png' : ppuser)
    await conn.sendFileFromUrl(anu.id.remote, `https://restapi-beta.herokuapp.com/api/welcome?username=${await user.getFormattedNumber()}&memcount=${metadata.groupMetadata.participants.length}&groupname=${metadata.name}&ppurl=${totiny}&bgurl=${bgurl}`, {caption: greet, mentions: [user]})
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
    await conn.sendFileFromUrl(anu.id.remote, `https://restapi-beta.herokuapp.com/api/goodbye?username=${await user.getFormattedNumber()}&memcount=${metadata.groupMetadata.participants.length}&groupname=${metadata.name}&ppurl=${totiny}&bgurl=${bgurl}`, {caption: greet, mentions: [user]})
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
const { owner } = require('../lib/config')
let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log("Update 'greetings.js'")
  delete require.cache[file]
  if (global.reload) console.log(global.reload())
})