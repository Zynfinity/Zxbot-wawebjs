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
    m.hasQuotedMsg ? m._data.quotedMsg.sender = m._data.quotedParticipant : {}
    /*m.isBot = m.id.split('_')[2].startsWith('BAE5') && m.id.split('_')[2].length == 16 || m.id.split('_')[2].startsWith('3EB0') && m.id.split('_')[2].length == 20 ? true : false
        m.quoted = {...m.quotedMsg}
       m.quoted.isBot = m.quotedMsg ? m.quoted.id.split('_')[2].startsWith('3EB0') && m.quoted.id.split('_')[2].length == 20 || m.quoted.id.split('_')[2].startsWith('BAE5') && m.quoted.id.split('_')[2].length == 16 ? true : false : false
       */

    //conn
    conn.sendText = async(from, text) => {
        conn.sendMessage(from, text)
    }
    conn.sendFileFromUrl = async (from, url, option) => {
      const media = await MessageMedia.fromUrl(url, {unsafeMime: true});
      conn.sendMessage(from, media, { ...option});
    };
    conn.sendSticker = async(from, sticker, pack, author) => {
        conn.sendMessage(from, sticker, {sendMediaAsSticker: true, stickerName: pack, stickerAuthor: author, quotedMessageId: m.msgId})
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
