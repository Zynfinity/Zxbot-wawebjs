module.exports = {
    name: ['me'].map((v) => v + ''),
    cmd: ['me'],
    category: 'information',
    desc: ['Menampilkan informasi user', '.me'],
    async handler(m, {conn,  msgId}){
        iuser = await m.getContact()
        pp = await iuser.getProfilePicUrl() == undefined ? 'https://divedigital.id/wp-content/uploads/2021/10/2-min.png' : await iuser.getProfilePicUrl()
        me = `*U S E R  I N F O R M A T I O N*\n\n`
        me += `${global.shp} STATUS : ${await iuser.getAbout() ? await iuser.getAbout() : 'Private'}\n`
        for(let i of Object.entries(iuser)){
            if(i[1] != undefined && i[0] != 'id') me += `${global.shp} ${i[0].toUpperCase()} : ${i[1]}\n`
        }
        conn.sendFileFromUrl(m.from, pp, {caption: me, quotedMessageId: msgId})
    }
}