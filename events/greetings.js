const {db} = require('../lib/database/database')
const { getBuffer } = require('../lib/tools')
const dbwelkam = db.collection('welcome')
const dbleft = db.collection('left')
const bgurl = 'https://images3.alphacoders.com/117/thumb-1920-1174531.jpg'
const welcome = async(anu, conn) => {
    require('../lib/function/function').func('', conn, '')
    console.log(anu)
    cekdata = await dbwelkam.findOne({id: anu.id.remote})
    console.log(cekdata)
    if(cekdata == null) return
    user = await conn.getContactById(anu.id.participant)
    console.log(user)
    metadata = await conn.getChatById(anu.id.remote)
    //console.log(metadata)
    greet = cekdata.text ? cekdata.text : `Halo ${user.pushname} 👋🏻\nSelamat datang di Group ${metadata.name}\nPatuhi rules group ini ya...`
    ppuser = await user.getProfilePicUrl().catch((e) => 'https://divedigital.id/wp-content/uploads/2021/10/2-min.png')
    console.log(ppuser)
    await conn.sendFileFromBuffer(owner, await getBuffer(`https://restapi-beta.herokuapp.com/api/welcome?username=${user.pushname}&memcount=${metadata.groupMetadata.participants.length}&groupname=${metadata.name}&ppurl=${ppuser}&bgurl=${bgurl}`), 'image/jpeg', {caption: greet})
}
const left = ''
async function simulate(action, m, conn){
    simul = {
        id: {
            remote: m.from,
            participant: m.sender,
        },
    }
    if(action == 'welcome') welcome(simul, conn)
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