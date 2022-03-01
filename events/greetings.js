const got = require('got')
const {db} = require('../lib/database/database')
const dbwelkam = db.collection('welcome')
const dbleft = db.collection('left')
const {m} = require('../lib/handler')
const greetings = async(anu, conn) => {
    console.log(anu)
    console.log(m)
    teksd = anu.action == 'add' ? `Halo @${anu.who.split('@')[0]} 👋🏻\nSelamat datang di group` : 'bye bye'
    if(anu.action == 'add'){
        cekdata = await dbwelkam.findOne({id: anu.chat})
        console.log(cekdata)
        if(cekdata == null) return
        ppuser = await conn.getProfilePicFromServer(anu.who).catch((e) => 'https://divedigital.id/wp-content/uploads/2021/10/2-min.png')
        conn.sendFileFromUrl(anu.chat, ppuser, 'welkom.jpg', teksd)
    }
}
async function simulate(action, who, chat, con){
    console.log(action)
    if(action == 'add') greetings(asu = {action: action, who: who, chat: chat}, con)
}
module.exports = {greetings, simulate}
const fs = require('fs')
let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log("Update 'greetings.js'")
  delete require.cache[file]
  if (global.reload) console.log(global.reload())
})