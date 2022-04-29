module.exports = {
    name: ['setstatus'],
    cmd: ['setstatus'],
    category: 'owner',
    owner: true,
    async handler(m, {conn, text}){
        if(!text) return m.reply('????')
        if(m.command == 'setstatus'){
            conn.setStatus(text).then(() => m.reply('Sukses mengubah status menjadi ' + text))
        }
    }
}