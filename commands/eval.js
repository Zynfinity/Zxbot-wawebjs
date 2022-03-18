const fs = require('fs')
const tools = require('../lib/tools')
const {db} = require('../lib/database/database')
const dbs = require('../lib/database/database')
const scrap = require('../lib/scraper')
const textmaker = require('../lib/textmaker')
const {MessageMedia} = require('whatsapp-web.js')
module.exports = {
  name: ['eval'].map((v) => v + ' <Your Code>'),
  cmd: /^(ev|eval)$/i,
  category: 'owner',
  desc: ['Untuk Mengeksekusi kode javascript', '.eval < code >'],
  owner: true,
  async handler(m, {conn, msgId, zx, q}){
    const util = require('util')
      function _(rem) {
          ren = JSON.stringify(rem, null, 2)
          pes = util.format(ren)
          conn.reply(m, pes, msgId)
        }
        try {
          q
          conn.reply(m, require('util').format(eval(`(async () => { ${q} })()`)), msgId)
        } catch (err) {
          e = String(err)
          conn.reply(m, e, msgId)
        }
  }
}