const { MessageMedia } = require("whatsapp-web.js");
module.exports = {
  async func(m, conn, zx) {
    /*m.isBot = m.id.split('_')[2].startsWith('BAE5') && m.id.split('_')[2].length == 16 || m.id.split('_')[2].startsWith('3EB0') && m.id.split('_')[2].length == 20 ? true : false
        m.quoted = {...m.quotedMsg}
       m.quoted.isBot = m.quotedMsg ? m.quoted.id.split('_')[2].startsWith('3EB0') && m.quoted.id.split('_')[2].length == 20 || m.quoted.id.split('_')[2].startsWith('BAE5') && m.quoted.id.split('_')[2].length == 16 ? true : false : false
       */
    //conn
    conn.sendText = async(from, text) => {
        conn.sendMessage(from, text)
    }
    conn.reply = async(anu, text, id, option) => {
      conn.sendMessage(anu.from, text, {...option, quotedMessageId: id})
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
      send = await conn.sendMessage(from, media, { ...option});
      return send
    };
    conn.sendFileFromBuffer = async (from, buffer, mimetype, option) => {
      const media = await new MessageMedia(mimetype, await buffer.toString('base64'), option.filename ? option.filename : '')
      conn.sendMessage(from, media, { ...option});
    };
    conn.sendFileFromPath = async(from, path, option) => {
      const media = await MessageMedia.fromFilePath(path, {unsafeMime: true})
      conn.sendMessage(from, media, {...option})
    }
    conn.sendSticker = async(anu, sticker, pack, author, option) => {
        anu.sendMessage(sticker, {...option, sendMediaAsSticker: true, stickerName: pack, stickerAuthor: author})
    }
    conn.sendStickerFromUrl = async(from, url, pack, author, option) => {
      const media = await MessageMedia.fromUrl(url, {unsafeMime: true});
      conn.sendMessage(from, media, {...option, sendMediaAsSticker: true, stickerName: pack, stickerAuthor: author})
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
