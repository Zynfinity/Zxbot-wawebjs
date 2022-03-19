const { simulate } = require("../events/greetings")
module.exports = {
    name: ['simulate'].map((v) => v + ' <welcome/left>'),
    cmd: ['simulate'],
    category: 'group',
    desc: ['Melakukan simulasi fitur welcome/left', '.simulate <welcome/left>'],
    group: true,
    async handler(m, {conn,  msgId, args}){
        if(args[0] != 'welcome' && args[0] != 'left') return await m.reply('Pilih welcome/left')
        await m.reply('Simulating ....')
        simulate(args[0], m, conn)
    }
}