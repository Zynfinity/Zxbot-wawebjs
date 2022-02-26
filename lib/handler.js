const fs = require('fs')
const path = require('path')

module.exports = {
	async handler(mess, zar){
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
        } = mess
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
        	owner = 'Perintah ini hanya bisa dilakukan oleh Owner!'
        }
        const sfail = async(p) => {
        	zar.reply(mess.from, fail[p], mess.id)
        }
        //exec command
        for(name in global.plugins){
  			plugin = global.plugins[name]
  			if(plugin.name == command){
  				try{
  					if(plugin.owner && owner.includes(mess.sender.id)) return sfail('owner')
    				plugin.handler(mess, extra)
    			}catch(e){
    				zar.reply(mess.from, String(e), mess.id)
    			}
    			return
  			}
		}	 
	}
}
