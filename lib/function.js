const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const moment = require("moment-timezone");
const config = require("./config");
const ms = require('parse-ms');
const {db} = require('./database/database');
const { sleep } = require("./tools");
module.exports = {
	async handler(m, conn) {
		const zx = await m.getChat()
		require('./function/function').func(m, conn, zx)
		conn.mode = conn.mode ? conn.mode : 'public'
		global.shp = "➜";
		const {
			_data,
			caption,
			mediaKey,
			id,
			ack,
			hasMedia,
			body,
			type,
			timestamp,
			from,
			to,
			author,
			deviceType,
			isForwarded,
			forwardingScore,
			isStatus,
			isStarred,
			broadcast,
			fromMe,
			hasQuotedMsg,
			duration,
			location,
			vCards,
			inviteV4,
			mentionedIds,
			orderId,
			token,
			isGif,
			isEphemeral,
			links,
			isUrl
		  } = m
		budy = (type === 'chat') ? body : (((type === 'image' || type === 'video' || type === 'buttons_response') && body)) ? body : type === 'list_response' ? m.selectedRowId : ''
		//const prefix = /^[#./\\]/.test(budy) ? budy.match(/^[#./\\]/gi) : '.'
		prefix = '.'
		chats = type === 'list_response' ? m.selectedRowId : (type === 'chat' && body.startsWith(prefix)) ? body : (((type === 'image' || type === 'video' ) && body) && body.startsWith(prefix)) ? body : ''
			//m
			m.isUrl = (url) => {
				return url.match(
				new RegExp(
					/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/,
					"gi"
				)
				);
			};
			m.msgId = m.id._serialized
			m.sender = zx.isGroup ? m.author : m.from
			m.hasQuotedMsg ? m.quoted.sender = m._data.quotedParticipant : {}
		m.parseMention = async(text) => {
			return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@c.us')
		}
		const args = chats.trim()
			.split(/ +/)
			.slice(1);
		const q = args.join(" ");
		const isOwner = config.owner.includes(zx.isGroup ? m.author : m.from);
		require('./function/function').func(m, conn, zx)
		if(conn.mode == 'self' && !isOwner) return
		const admin = zx.isGroup ? zx.participants.filter(s => s.isAdmin).map(s => s.id._serialized) : {}
		const isAdmin = zx.isGroup ? admin.includes(m.author) : false;
		const isBotAdmin = zx.isGroup ? admin.includes(conn.info.wid._serialized) : false;
		const extra = {
			q,
			isBotAdmin,
			isAdmin,
			text: q,
			budy,
			botNumber: conn.info.wid._serialized,
			quotedMsg: _data.quotedMsg,
			msgId: m.id._serialized,
			args,
			mimetype: _data.mimetype,
			prefix,
			admin,
			conn,
			zx,
			_data,
			mediaKey,
			id,
			ack,
			hasMedia,
			body,
			type,
			timestamp,
			from,
			to,
			author,
			deviceType,
			isForwarded,
			forwardingScore,
			isStatus,
			isStarred,
			broadcast,
			fromMe,
			hasQuotedMsg,
			duration,
			location,
			vCards,
			inviteV4,
			mentionedIds,
			orderId,
			token,
			isGif,
			isEphemeral,
			links,
			isOwner,
			isUrl
		};
		for(fungsi of Object.values(global.functions).filter(fc => !fc.antispam && !fc.disabled && !fc.typo)){
			await fungsi.handler(m, extra)
		}
		if(conn.mode == 'self') return
		const chets = await conn.getChats()
		if(chets.length > 50){
			conn.mode = 'self'
			conn.sendText(config.owner, 'Total chat has exceeded the limit (50), Bot will start deleting messages')
			idd = chets.map(c => c.id._serialized)
			for(let i=0; i<idd.length; i++){
				chat = await conn.getChatById(idd[i])
				chat.delete()
				if(i + 1 == idd.length){
					conn.mode = 'public'
					conn.sendMessage(config.owner, 'Delete chats Complete')
				}
			}
		}
	},
};
let file = require.resolve(__filename);
fs.watchFile(file, () => {
	fs.unwatchFile(file);
	console.log(chalk.redBright("Update handlerfc.js'"));
	delete require.cache[file];
	if (global.reload) console.log(global.reload());
});