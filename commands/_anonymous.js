const fs = require('fs')
module.exports = {
    name: ['anonymous_function'],
    function: true,
    async handler(m, {conn, zx}){
        if(zx.isGroup) return
        if(m.command) return
        const anony = JSON.parse(fs.readFileSync('./lib/json/anonymous.json'))
        const find = Object.values(anony).find(anon => [anon.a, anon.b].includes(m.sender) && anon.status == 'chatting')
        if(find == undefined) return
        const to = find.a == m.sender ? find.b : find.a
        m.forward(to)
    }
}