module.exports = {
    async func(m, conn){
        m.reply = (text) => {
            conn.sendReplyWithMentions(m.from, text, m.id)
        }
        m.isBot = m.id.split('_')[2].startsWith('BAE5') && m.id.split('_')[2].length == 16 || m.id.split('_')[2].startsWith('3EB0') && m.id.split('_')[2].length == 20 ? true : false
        m.quoted = {...m.quotedMsg}
       m.quoted.isBot = m.quotedMsg ? m.quoted.id.split('_')[2].startsWith('3EB0') && m.quoted.id.split('_')[2].length == 20 || m.quoted.id.split('_')[2].startsWith('BAE5') && m.quoted.id.split('_')[2].length == 16 ? true : false : false
    }
}
const fs = require('fs')
let file = require.resolve(__filename);
fs.watchFile(file, () => {
	fs.unwatchFile(file);
	console.log("Update 'function.js'")
	delete require.cache[file];
	if (global.reload) console.log(global.reload());
});
