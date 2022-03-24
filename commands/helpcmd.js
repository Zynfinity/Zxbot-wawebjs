const djs = require("@discordjs/collection");
module.exports = {
    name: 'help',
    cmd: ['help'],
    category: 'other',
    desc: ['Melihat informasi dari Command', '.help <Command>'],
    ignored: true,
    async handler(m, {conn,  msgId, q, prefix}){
        if(!q) {
            //return global.plugins['menu.js'].handler(m, {conn,  msgId, prefix})
            menu = await djs.commands.find(cmd => cmd.cmd.includes('menu'))
            return menu.handler(m, {conn, msgId, prefix})
        }
            plugin = await djs.commands.find(cmd => !cmd.function && !cmd.disabled && !cmd.ignored && cmd.cmd && cmd.cmd.includes(q))
            if(plugin == undefined) return m.reply(`Command ${q} tidak tercantum di menu!`)
            helpt = '*Helper*\n'
            helpt += `${global.shp} Command : ${q.toUpperCase()}\n`
            helpt += `${global.shp} Trigger Command : ${plugin.cmd.join(', ')}\n`
            helpt += `${global.shp} Category : ${plugin.category}\n\n`
            helpt += '*Command Atribute*\n'
            helpt += `${global.shp} isOwner : ${plugin.owner ? '✅' : '❌'}\n`
            helpt += `${global.shp} isAdmin : ${plugin.admin ? '✅' : '❌'}\n`
            helpt += `${global.shp} isBotAdmin : ${plugin.botAdmin ? '✅' : '❌'}\n`
            helpt += `${global.shp} isPrivate : ${plugin.private ? '✅' : '❌'}\n`
            helpt += `${global.shp} isGroup : ${plugin.group ? '✅' : '❌'}\n`
            if(plugin.desc){
                helpt += '\n*Command Description*\n'
                helpt += `${global.shp} ${plugin.desc[0]}\n\n`
                helpt += `${global.shp} Usage : ${plugin.desc[1].replace(/@command/g, q)}`
            }
            return await m.reply(helpt)
    }
}