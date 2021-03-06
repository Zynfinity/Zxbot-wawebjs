const ms = require('parse-ms')
module.exports = {
  name: ['afk_function'],
  function: true,
  async handler(m, { conn, msgId, zx, quotedMsg, mentionedIds}) {
    try{
      if(!zx.isGroup) return
      if(m.command == 'afk') return
      const { db } = require("../lib/database/database");
      const data = await db.collection("afk");
      afkdata = await data.findOne({ id: m.author });
      if (afkdata != null) {
          waktuafk = await ms(Date.now() - afkdata.time)
        eafk = `_Anda telah kembali dari mode afk_\n\n`;
        if (afkdata.reason != "nothing") eafk += `_Setelah :_ *_${afkdata.reason}*_\n`
        eafk += `_Selama :_ *_${waktuafk.hours} Jam  ${waktuafk.minutes} Menit  ${waktuafk.seconds} Detik Yang lalu_*`
        data.deleteOne({ id: m.author }).then((s) => conn.mentions(m.from, eafk, {quotedMessageId: msgId}));
      }
      if (quotedMsg) {
        afkdata = await data.findOne({ id: quotedMsg.sender });
        if (afkdata != null) {
          user = await conn.getContactById(quotedMsg.sender)
          cekafk = await ms(Date.now() - afkdata.time)
          ini_txt = `_${user.pushname} Sedang AFK..._\n\n`
          ini_txt += `${global.shp} _Reason :_ *_${afkdata.reason}_*\n${global.shp} _Since :_ *_${cekafk.hours} Jam  ${cekafk.minutes} Menit  ${cekafk.seconds} Detik  Yang lalu_*`
          conn.mentions(m.from, ini_txt, {quotedMessageId: msgId})
      }
      } else if (mentionedIds != "") {
          afkdata = await data.findOne({ id: mentionedIds[0] });
          if (afkdata != null) {
              user = await conn.getContactById(res)
              cekafk = await ms(Date.now() - afkdata.time)
              ini_txt = `_${user.pushname} Sedang AFK..._\n\n`
              ini_txt += `${global.shp} _Reason :_ *_${afkdata.reason}_*\n${global.shp} _Since :_ *_${cekafk.hours} Jam  ${cekafk.minutes} Menit  ${cekafk.seconds} Detik  Yang lalu_*`
              conn.mentions(m.from, ini_txt, {quotedMessageId: msgId})
          }
      }
    }catch{}
  }
};
