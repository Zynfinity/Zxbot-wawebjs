module.exports = {
    name: 'help',
    cmd: /^(help)$/i,
    category: 'other',
    desc: ['Melihat informasi dari command', '.help <command>'],
    ignored: true,
    async handler(m, {conn, q}){
        for(name in global.plugins){
            plugin = global.plugins[name]
            let isAccept = plugin.cmd instanceof RegExp ? plugin.cmd.test(q) : Array.isArray(plugin.cmd) ? plugin.cmd.some((cmd) => (cmd instanceof RegExp ? cmd.test(q) : cmd === q)) : typeof plugin.cmd === 'string' ? plugin.cmd === q : false
            if (!isAccept) continue
            helpt = '*Helper*\n'
            helpt += `${global.shp} Command : ${plugin.name}\n`
            helpt += `${global.shp} Trigger Command : ${q}\n`
            helpt += `${global.shp} Category : ${plugin.category}\n\n`
            helpt += '*Command Atribute*\n'
            helpt += `${global.shp} isOwner : ${plugin.owner ? true : false}\n`
            helpt += `${global.shp} isAdmin : ${plugin.admin ? true : false}\n`
            helpt += `${global.shp} isBotAdmin : ${plugin.botadmin ? true : false}\n`
            helpt += `${global.shp} isPrivate : ${plugin.private ? true : false}\n`
            helpt += `${global.shp} isGroup : ${plugin.group ? true : false}\n`
            if(plugin.desc){
                helpt += '\n*Command Description*\n'
                helpt += `${global.shp} ${plugin.desc[0]}\n\n`
                helpt += `${global.shp} Usage : ${plugin.desc[1]}`
            }
            return conn.reply(m.from, helpt, m.id)
        }
        conn.reply(m.from, `Command ${q} tidak tercantum di menu!`, m.id)
    }
}