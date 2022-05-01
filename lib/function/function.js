const { MessageMedia, List } = require("whatsapp-web.js");
const util = require('util')
const fs = require("fs");
const ctwa = {
  "ctwaContext": {
    "sourceUrl": "https://chat.whatsapp.com/CGMJD56YU2w4v1q5kvuyKg",
    "description": "Whatsapp Bot MD",
    "title": "ZxBot WhatsApp",
    'thumbnail': fs.readFileSync('./lib/media/thumb.jpg').toString('base64')
  }
}
module.exports = {
  async func(m, conn, zx) {
    m.quoted = {}
    m.isBot = m.id.id.startsWith('BAE5') && m.id.id.length == 16 || m.id.id.startsWith('3EB0') && m.id.id.length == 20 ? true : false
    m.quoted = {...m._data.quotedMsg}
    m.quoted.isBot = m.hasQuotedMsg ? m._data.quotedStanzaID ? m._data.quotedStanzaID.startsWith('3EB0') && m._data.quotedStanzaID.length == 20 || m._data.quotedStanzaID.startsWith('BAE5') && m._data.quotedStanzaID.length == 16 ? true : false : false : false
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
			m.hasQuotedMsg ? m.quoted.sender = m._data.quotedParticipant : {}
			m.parseMention = async(text) => {
				return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@c.us')
			}
      m.download = async() => {
        media = await m.downloadMedia()
        return media == undefined ? 'No media detected' : await Buffer.from(media.data, 'base64')
      }
      m.quoted.download = async() => {
        quot = await m.getQuotedMessage()
        media = await quot.downloadMedia()
        return media == undefined ? 'No media detected' : await Buffer.from(media.data, 'base64')
      }
      //m.hasQuotedMsg ? delete m._data.quotedMsg : {}
    //conn
    conn.sendText = async(from, text, option) => {
        conn.sendMessage(from, text, {...option})
    }
    m.reply = async(text, option) => {
      if(typeof text == 'string'){
        conn.sendMessage(m.from, text, {...option, quotedMessageId: m.msgId})
      }else{
        ren = JSON.stringify(text, null, 2)
        pes = util.format(ren)
        conn.sendMessage(m.from,pes, {...option, quotedMessageId: m.msgId, extra: {...ctwa}})
      }
    }
    conn.ctwa = async(title, description, thumbnail, mediaUrl) => {
      if(!title && !description && !thumbnail && !mediaUrl){
        const thumb = await MessageMedia.fromUrl('https://i.ytimg.com/vi/XB5mB1WuzbM/hqdefault.jpg')
        return({
          "ctwaContext": {
            title: '🤖  𝙕𝙓𝘽𝙊𝙏 𝙈𝙐𝙇𝙏𝙄𝘿𝙀𝙑𝙄𝘾𝙀',
            description: `Whatsapp-Web Version : ${await conn.getWWebVersion()}`,
            thumbnail: thumb.data,
            mediaType: 2,
            mediaUrl: 'https://youtube.com/watch?v=XB5mB1WuzbM'
          }
        })
      }
      else return({
        ctwaContext: {
          title: title,
          description: description,
          thumbnail: thumbnail,
          mediaType: 2,
          mediaUrl: mediaUrl
        }
      })
    }
    conn.mentions = async(from, text, option) => {
      tag = []
      tagg = await m.parseMention(text)
      for(let i of tagg){
        con = await conn.getContactById(i)
        tag.push(con)
      }
      conn.sendMessage(from, text, {...option, mentions: tag, extra: {...ctwa}})
    }
    conn.sendList = async(from, title, txt, row, buttontext, option) => {
      const section = [{'title':'sectionTitle','rows':row}]
      const list = await new List(txt, buttontext, section, title)
      await conn.sendMessage(from, list, { ...option, extra: option && option.ctwa ? option.ctwa.type == 'link' ? ctwa : option.ctwa.data : ''})
    }
    conn.sendFileFromUrl = async (from, url, option, option1) => {
      const media = await MessageMedia.fromUrl(url, {...option1, unsafeMime: true});
      option1 ? option1.mimetype ? media.mimetype = option1.mimetype : {} : {}
      send = await conn.sendMessage(from, media, { ...option, extra: option && option.ctwa ? option.ctwa.type == 'link' ? ctwa : option.ctwa.data : ''});
      return send
    };
    conn.sendFileFromBuffer = async (from, buffer, option) => {
      const media = await new MessageMedia(option.mimetype, await buffer.toString('base64'), option ? option.filename ? option.filename : '' : '')
      const send = await conn.sendMessage(from, media, { ...option, extra: option && option.ctwa ? option.ctwa.type == 'link' ? ctwa : option.ctwa.data : ''});
      return send
    };
    conn.sendFileFromPath = async(from, path, option) => {
      const media = await MessageMedia.fromFilePath(path, {unsafeMime: true})
      const send = await conn.sendMessage(from, media, { ...option, extra: option && option.ctwa ? option.ctwa.type == 'link' ? ctwa : option.ctwa.data : ''})
      return send
    }
    conn.sendSticker = async(anu, sticker, pack, author, option) => {
        anu.sendMessage(sticker, {...option, sendMediaAsSticker: true, stickerName: pack, stickerAuthor: author, extra: option && option.ctwa ? option.ctwa.type == 'link' ? ctwa : option.ctwa.data : ''})
    }
    conn.sendStickerFromUrl = async(from, url, pack, author, option) => {
      const media = await MessageMedia.fromUrl(url, {unsafeMime: true});
      conn.sendMessage(from, media, {...option, sendMediaAsSticker: true, stickerName: pack, stickerAuthor: author, extra: option && option.ctwa ? option.ctwa.type == 'link' ? ctwa : option.ctwa.data : ''})
  }
  },
};
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log("Update 'function.js'");
  delete require.cache[file];
  if (global.reload) console.log(global.reload());
});
