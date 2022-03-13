const { simulate } = require("../events/greetings")
module.exports = {
    name: ['simulate'].map((v) => v + ' <welcome/left>'),
    cmd: /^(simulate)$/i,
    category: 'group',
    desc: ['Melakukan simulasi fitur welcome/left', '.simulate <welcome/left>'],
    group: true,
    async handler(m, {conn, args}){
        if(args[0] != 'welcome' && args[0] != 'left') return conn.reply(m, 'Pilih welcome/left')
        await conn.reply(m, 'Simulating ....')
        simulate(args[0], m, conn)
    }
}