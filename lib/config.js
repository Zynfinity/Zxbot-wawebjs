const owner = "6289506883380@c.us"
const mongourl = '' //your mongo url
const antispam = false
const stickerMetadata = { stickerAuthor: "ZxBOT", stickerName: "@ihsanafajar"};
const StickerMetadatacrop = { author: "ZxBOT", pack: "@ihsanafajar", keepScale: false };
const gifcrop = {
  crop: true,
  square: 240,
  fps: 30,
  loop: 0,
  startTime: `00:00:00.0`,
  endTime: `00:00:10.0`,
};
module.exports = { owner, stickerMetadata, StickerMetadatacrop, gifcrop, antispam, mongourl};
const fs = require("fs");
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log("Update 'config.js'");
  delete require.cache[file];
  if (global.reload) console.log(global.reload());
});
