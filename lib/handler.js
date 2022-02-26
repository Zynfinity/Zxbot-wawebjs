const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const moment = require('moment-timezone')
module.exports = {
    async handler(m, zar){
        prefix = '.'
        const {
            type,
            body,
            id,
            from,
            t,
            sender,
            isGroupMsg,
            chat,
            chatId,
            caption,
            isMedia,
            isAudio,
            mimetype,
            quotedMsg,
            quotedMsgObj,
            author,
            mentionedJidList
        } = m
        bodyy = (type === 'chat' && body.startsWith(prefix)) ? body : (((type === 'image' || type === 'video') && caption) && caption.startsWith(prefix)) ? caption : ''
        const commands = caption || bodyy || ''
        const comman = commands.toLowerCase().split(' ')[0] || ''
        const command = comman ? comman.split(prefix)[1] : ''
        const args = body.trim().split(/ +/).slice(1)
        const q = args.join(' ')
        const owner = '6289506883380@c.us'
        const extra = {
            q,
            conn: zar
        }
        const fail = {
            owner: 'Perintah ini hanya bisa dilakukan oleh Owner!'
        }
        const sfail = async(p) => {
            zar.reply(m.from, fail[p], m.id)
        }
        const log = async(logg) => {
            console.log(chalk.green(moment.tz('Asia/Jakarta').format('DD/MM/YY HH:mm:ss')) + ' ' + chalk.red('[ P U B L I C ]') + ' ' + chalk.cyanBright(m.type) + ': ' + chalk.yellowBright(' from: ' + m.sender.pushname) + ' chat: ' + chalk.greenBright(logg))
        }
        //exec command
        for(name in global.plugins){
            plugin = global.plugins[name]
            if(plugin.name == command){
                try{
                    log(command)
                    if(plugin.owner && !owner.includes(m.sender.id)) return sfail('owner')
                    plugin.handler(m, extra)
                }catch(e){
                    zar.reply(m.from, String(e), m.id)
                }
                return
            }
        }    
    }
}
