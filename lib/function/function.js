const { MessageMedia } = require("whatsapp-web.js");
module.exports = {
  async func(m, conn, zx) {
    //m
    m.isUrl = (url) => {
      return url.match(
        new RegExp(
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/,
          "gi"
        )
      );
    };
    m.msgId = m.id._serialized
    m.sender = zx.isGroup ? m.author : m.from
    m.hasQuotedMsg ? m._data.quotedMsg.sender = m._data.quotedParticipant : {}
    m.parseMention = async(text) => {
      return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@c.us')
    }
    /*m.isBot = m.id.split('_')[2].startsWith('BAE5') && m.id.split('_')[2].length == 16 || m.id.split('_')[2].startsWith('3EB0') && m.id.split('_')[2].length == 20 ? true : false
        m.quoted = {...m.quotedMsg}
       m.quoted.isBot = m.quotedMsg ? m.quoted.id.split('_')[2].startsWith('3EB0') && m.quoted.id.split('_')[2].length == 20 || m.quoted.id.split('_')[2].startsWith('BAE5') && m.quoted.id.split('_')[2].length == 16 ? true : false : false
       */
    //conn
    conn.sendText = async(from, text) => {
        conn.sendMessage(from, text)
    }
    conn.reply = async(anu, text, option) => {
      conn.sendMessage(anu.from, text, {...option, quotedMessageId: anu.id._serialized})
    }
    conn.mentions = async(from, text, option) => {
      tag = []
      tagg = await m.parseMention(text)
      for(let i of tagg){
        con = await conn.getContactById(i)
        tag.push(con)
      }
      conn.sendMessage(from, text, {...option, mentions: tag})
    }
    conn.sendFileFromUrl = async (from, url, option, option1) => {
      const media = await MessageMedia.fromUrl(url, {...option1, unsafeMime: true});
      option1 ? option1.mimetype ? media.mimetype = option1.mimetype : {} : {}
      conn.sendMessage(from, media, { ...option});
    };
    conn.sendFileFromPath = async(from, path, option) => {
      const media = await MessageMedia.fromFilePath(path, {unsafeMime: true})
      conn.sendMessage(from, media, {...option})
    }
    conn.sendSticker = async(anu, sticker, pack, author, option) => {
        anu.sendMessage(sticker, {...option, sendMediaAsSticker: true, stickerName: pack, stickerAuthor: author})
    }
    conn.sendStickerFromUrl = async(from, url, pack, author) => {
      const media = await MessageMedia.fromUrl(url, {unsafeMime: true});
      conn.sendMessage(from, media, {sendMediaAsSticker: true, stickerName: pack, stickerAuthor: author, quotedMessageId: m.msgId})
  }
  },
};
const fs = require("fs");
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log("Update 'function.js'");
  delete require.cache[file];
  if (global.reload) console.log(global.reload());
});
