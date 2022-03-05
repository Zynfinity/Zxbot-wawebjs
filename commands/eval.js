const fs = require('fs')
const {db} = require('../lib/database/database')
const dbs = require('../lib/database/database')
const scrap = require('../lib/scraper')
const {MessageMedia} = require('whatsapp-web.js')
module.exports = {
  name: ['eval'].map((v) => v + ' <Your Code>'),
  cmd: /^(ev|eval)$/i,
  category: 'owner',
  desc: ['Untuk Mengeksekusi kode javascript', '.eval < code >'],
  owner: true,
  async handler(m, {conn,zx, q}){
    const util = require('util')
      function _(rem) {
          ren = JSON.stringify(rem, null, 2)
          pes = util.format(ren)
          m.reply(pes)
        }
        try {
          q
          m.reply(require('util').format(eval(`(async () => { ${q} })()`)))
        } catch (err) {
          e = String(err)
          m.reply(e)
        }
  }
}