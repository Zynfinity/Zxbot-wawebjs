const axios = require('axios')
const FormData = require('form-data');
const fs = require('fs')
const fetch = require('node-fetch')
const {
	fromBuffer
} = require('file-type');
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
  static kapitalisasiKata = async(str) => {
 return str.replace(/\w\S*/g, function(kata){ 
   const kataBaru = kata.slice(0,1).toUpperCase() + kata.substr(1);
   return kataBaru
   });
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
  static telegraph = async(buffer) => {
    const { ext } = await fromBuffer(buffer)
    let form = new FormData
    form.append('file', buffer, 'tmp.' + ext)
    let res = await fetch('https://telegra.ph/upload', {
      method: 'POST',
      body: form
    })
    let img = await res.json()
    if (img.error) throw img.error
    return 'https://telegra.ph' + img[0].src
  }
  static fileIO = async (buffer) => {
    const { ext } = await fromBuffer(buffer) || {}
    let form = new FormData
    form.append('file', buffer, 'tmp.' + ext)
    let res = await fetch('https://file.io/?expires=1d', { // 1 Day Expiry Date
      method: 'POST',
      body: form
    })
    let json = await res.json()
    if (!json.success) throw json
    return json.link
  }
  static getBuffer = async (url, options) => {
    try {
      options ? options : {}
      const res = await axios({
        method: "get",
        url,
        headers: {
          'DNT': 1,
          'Upgrade-Insecure-Request': 1
        },
        ...options,
        responseType: 'arraybuffer'
      })
      return res.data
    } catch (e) {
      console.log(`Error : ${e}`)
    }
  }
}
module.exports = tools
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log("Update 'tools.js'");
  delete require.cache[file];
  if (global.reload) console.log(global.reload());
});