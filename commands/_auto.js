const {sleep} = require('../lib/tools')
const fs = require('fs')
module.exports = {
    name: ['function_auto'],
    function: true,
ignored: true,
    async handler(m, {conn, zx}){
        //if(!zx.isGroup) return
        setInterval(() => {
          ddb = JSON.parse(fs.readFileSync('./lib/json/data.json'))
            if (!ddb.auto) return
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
          }, 1000)
    }
}