const fs = require('fs')
const {db} = require('../lib/database/database')
const dbs = require('../lib/database/database')
const scrap = require('../lib/scraper')
module.exports = {
  name: ['eval'].map((v) => v + ' <Your Code>'),
  cmd: /^(ev|eval)$/i,
  category: 'owner',
  desc: ['Untuk Mengeksekusi kode javascript', '.eval < code >'],
  owner: true,
  async handler(m, {conn, q}){
    const util = require('util')
      function _(rem) {
          ren = JSON.stringify(rem, null, 2)
          pes = util.format(ren)
          conn.reply(m.from, pes, m.id)
        }
        try {
          q
          conn.reply(m.from, require('util').format(eval(`(async () => { ${q} })()`)), m.id)
        } catch (err) {
          e = String(err)
          conn.reply(m.from, e, m.id)
        }
  }
}