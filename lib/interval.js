const { exec } = require('child_process')
const fs = require('fs')
const { owner } = require('./config')
const toms = require('ms')
const {List} = require('whatsapp-web.js')
const interval = async(conn) => {
        setInterval(async() => {
            conn.game = conn.game ? conn.game : {}
            conn.game.tebakgambar = conn.game.tebakgambar ? conn.game.tebakgambar : {}
            conn.game.susunkata = conn.game.susunkata ? conn.game.susunkata : {}
            conn.cooldown = conn.cooldown ? conn.cooldown : {}
            if(conn.cooldown){
              Object.values(conn.cooldown).map((s) => {
                if (Date.now() >= s.timestamp) {
                  delete conn.cooldown[s.id]
                  delete conn.cooldown['undefined']
                }
              })
            }
            ddb = JSON.parse(fs.readFileSync('./lib/json/data.json'))
            if(ddb.auto){
              Object.values(ddb.auto).map((s) => {
                if (Date.now() >= s.timestamp) {
                  conn.getChatById(s.id).then(async chat => {
                    delete ddb.auto[s.id]
                    fs.writeFileSync('./lib/json/data.json', JSON.stringify(ddb))
                    return chat.setMessagesAdminsOnly(s.action == 'open' ? false : true)
                    delete ddb.auto['undefined']
                  })
                }
              })
            }
            if(ddb.cleartime){
              if(Date.now() >= ddb.cleartime){
                ddb.cleartime = Date.now() + await toms('3h')
                await fs.writeFileSync('./lib/json/data.json', JSON.stringify(ddb))
                await conn.sendMessage(owner, 'Clearing All Messages...')
                chats = await conn.getChats()
                id = chats.map(c => c.id._serialized)
                for(let i=0; i<id.length; i++){
                  chat = await conn.getChatById(id[i])
                  chat.clearMessages()
                  if(i + 1 == id.length) conn.sendMessage(owner, 'Clear Messages Complete')
                }
              }
            }
            if(ddb.restarttime){
              if(Date.now() >= ddb.restarttime){
                ddb.cleartime = ''
                await fs.writeFileSync('./lib/json/data.json', JSON.stringify(ddb))
                await conn.sendMessage(owner, 'Restarting Bot....')
                exec('pm2 restart index.js', async(stdout, err) => {
                  if(err) return console.log(err)
                  console.log('Restarting Bot')
                })
              }
            }
            if (!conn.game) return
            if(conn.game.family){
              Object.values(conn.game.family).map(async (s) => {
                if (Date.now() >= s.timeout) {
                  family = `${global.shp} Soal : ${s.soal}\n\n`
                  for(let i=1; i<=s.jawaban.length; i++){
                      urut = s.terjawab.find(ter => ter.pos == i)
                      if(urut != undefined) family += `${i}. ${urut.jawaban} <@${urut.sender.id._serialized.split('@')[0]}> + ${urut.pos == 1 ? '150' : '100'}\n`
                      else family += `${i}. ${s.jawaban[i - 1]}\n`
                  }
                  row = [{
                      id: '.family100',
                      title: 'Mulai Family100',
                      description: 'Bermain family100 lagi'
                  }]
                  section = [{'title':'sectionTitle','rows':row}]
                  list = await new List(family, 'Click Here', section, '*Family100*')
                  await conn.sendMessage(s.id, list, {quotedMessageId: s.msgId, mentions: s.terjawab.map(kon => kon.sender)})
                  delete conn.game.family[s.id]
                }
              })
            }
            if(conn.game.tebakgambar){
              Object.values(conn.game.tebakgambar).map(async (s) => {
                if (Date.now() >= s.timeout) {
                  timeout = `*_Timeout_*\n\nJawabannya adalah ${s.jawaban}`
                  await conn.sendMessage(s.id, timeout, {quotedMessageId: s.msgId})
                  delete conn.game.tebakgambar[s.id]
                }
              })
            }
            if(conn.game.susunkata){
              Object.values(conn.game.susunkata).map(async (s) => {
                if (Date.now() >= s.timeout) {
                  timeout = `*_Timeout_*\n\nJawabannya adalah ${s.jawaban}`
                  await conn.sendMessage(s.id, timeout, {quotedMessageId: s.msgId})
                  delete conn.game.susunkata[s.id]
                }
              })
            }
            if(conn.game.tebakkata){
              Object.values(conn.game.tebakkata).map(async (s) => {
                if (Date.now() >= s.timeout) {
                  timeout = `*_Timeout_*\n\nJawabannya adalah ${s.jawaban}`
                  await conn.sendMessage(s.id, timeout, {quotedMessageId: s.msgId})
                  delete conn.game.tebakkata[s.id]
                }
              })
            }
        }, 1000)
}
module.exports = interval