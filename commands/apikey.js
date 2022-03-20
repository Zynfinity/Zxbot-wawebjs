const axios = require('axios')
module.exports = {
    name: ['getapikey', 'cekapikey'].map((v) => v + ''),
    cmd: ['getapikey', 'cekapikey'],
    category: 'other',
    private: true,
    async handler(m, {conn, text}){
        if(m.command == 'getapikey'){
            axios.get('https://restapi-beta.herokuapp.com/api/getapikey?sender=' + m.sender).then(async ({data}) => {
                api = `${global.shp} *ZX-API*\n`
                api += `├ User : ${data.id}\n`
                api += `├ Apikey : ${data.apikey}\n`
                api += `├ Status : Active\n└`
                await m.reply(api)
            })
        }
        else if(m.command == 'cekapikey'){
            if(!text) return m.reply('Masukkan apikeynya!')
            axios.get('https://restapi-beta.herokuapp.com/api/cekapikey?apikey=' + text).then(async ({data}) => {
                if(data.status){
                    api = `${global.shp} *ZX-API*\n`
                    api += `├ User : ${data.id}\n`
                    api += `├ Apikey : ${data.apikey}\n`
                    api += `├ Status : Active\n└`
                }else{
                    api = `${global.shp} *ZX-API*\n`
                    api += `├ Status : Apikey Invalid\n└`
                }
                await m.reply(api)
            })
        }
    }
}