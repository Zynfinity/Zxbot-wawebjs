const axios = require('axios')
class tools {
  static sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}
	static toTimer = (seconds) => {
    function pad(s) {
      return (s < 10 ? '0' : '') + s
    }
    var hours = Math.floor(seconds / (60 * 60))
    var minutes = Math.floor((seconds % (60 * 60)) / 60)
    var seconds = Math.floor(seconds % 60)

    //return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)
    return `${pad(hours)} Jam - ${pad(minutes)} Menit - ${pad(seconds)} Detik`
  }
  static tiny = async(link) => {
    return new Promise((resolve) => {
      axios.get(`https://tinyurl.com/api-create.php?url=${link}`).then(res => {
        resolve(res.data)
      })
    })
  }
  static getRandom = (ext) => {
    return `${Math.floor(Math.random() * 10000)}${ext}`
  }
}
module.exports = tools
const fs = require("fs");
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log("Update 'tools.js'");
  delete require.cache[file];
  if (global.reload) console.log(global.reload());
});