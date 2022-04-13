const { exec } = require('child_process')
const fs = require('fs')
const { owner } = require('./config')
const toms = require('ms')
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
                exec('forever restartall', async(stdout, err) => {
                  if(err) return console.log(err)
                  console.log('Restarting Bot')
                })
              }
            }
            if (!conn.game) return
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