const fs = require('fs')
async function groupupdate(anu, conn){
    if(anu.type == 'description') { 
        conn.sendMessage(anu.id.remote, `Deskripsi Group telah diubah oleh @${anu.author.split('@')[0]}\nDeskripsi baru : \n${anu.body}`, {mentions: [await conn.getContactById(anu.author)]})
    }
    else if(anu.type == 'announce'){
        if(anu.author == conn.info.wid._serialized) return
        if(anu.body == 'on') conn.sendMessage(anu.id.remote, `Group telah ditutup oleh admin @${anu.author.split('@')[0]}\nSekarang hanya admin yang bisa mengirim pesan`, {mentions: [await conn.getContactById(anu.author)]})
        else conn.sendMessage(anu.id.remote, `Group telah dibuka oleh admin @${anu.author.split('@')[0]}\nSekarang semua member bisa mengirim pesan`, {mentions: [await conn.getContactById(anu.author)]})
    }
    else if(anu.type == 'subject'){
        conn.sendMessage(anu.id.remote, `Nama Group telah diubah oleh @${anu.author.split('@')[0]} menjadi *${anu.body}*`, {mentions: [await conn.getContactById(anu.author)]})
    }
    else if(anu.type == 'picture'){
        if(anu.body == 'set') conn.sendMessage(anu.id.remote, `Foto Group telah diubah oleh @${anu.author.split('@')[0]}`, {mentions: [await conn.getContactById(anu.author)]})
        else if(anu.body == 'remove') conn.sendMessage(anu.id.remote, `Foto Group telah dihapus oleh @${anu.author.split('@')[0]}`, {mentions: [await conn.getContactById(anu.author)]})
    }
    else if(anu.type == 'promote'){
        conn.sendMessage(anu.id.remote, `Selamat @${anu.recipientIds[0].split('@')[0]}, jabatan kamu telah dinaikkan menjadi admin oleh @${anu.author.split('@')[0]}`, {mentions: [await conn.getContactById(anu.author), await conn.getContactById(anu.recipientIds[0])]})
    }
    else if(anu.type == 'demote'){
        conn.sendMessage(anu.id.remote, `Halo @${anu.recipientIds[0].split('@')[0]}, jabatan kamu telah diturunkan menjadi member oleh @${anu.author.split('@')[0]}`, {mentions: [await conn.getContactById(anu.author), await conn.getContactById(anu.recipientIds[0])]})
    }
}
module.exports = groupupdate
let file = require.resolve(__filename);
fs.watchFile(file, () => {
	fs.unwatchFile(file);
	console.log("Update 'groupupdate.js'");
	delete require.cache[file];
	if (global.reload) console.log(global.reload());
});