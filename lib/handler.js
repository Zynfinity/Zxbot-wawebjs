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
		const {stcmd} = JSON.parse(fs.readFileSync('./lib/json/data.json'))
		const zx = await m.getChat()
		conn.mode = conn.mode ? conn.mode : 'public'
		if(zx.isGroup){
			const user = await m.getContact()
			if(user.isBlocked) return
		}
		global.shp = "⬡";
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
		cmdstick = type == 'sticker' ? stcmd.find(stc => stc.id == m._data.filehash) : false
		const budy = type == 'sticker' ? cmdstick.cmd : (type === 'chat') ? body : (((type === 'image' || type === 'video') && body)) ? body : type === 'list_response' ? m.selectedRowId : ''
		//const prefix = /^[#./\\]/.test(budy) ? budy.match(/^[#./\\]/gi) : '.'
		prefix = '.'
		const chats = type === 'sticker' ? cmdstick.cmd : type === 'list_response' ? m.selectedRowId : (type === 'chat' && body.startsWith(prefix)) ? body : (((type === 'image' || type === 'video' ) && body) && body.startsWith(prefix)) ? body : ''
		if(chats == undefined || chats == '') return
		const budyy = type == 'sticker' && cmdstick.cmd ? prefix + cmdstick.cmd : (type === 'chat') ? body : (((type === 'image' || type === 'video') && body)) ? body : type === 'list_response' ? m.selectedRowId : ''
		const chatss = type == 'sticker' && cmdstick.cmd ? prefix + cmdstick.cmd : type === 'list_response' ? m.selectedRowId : (type === 'chat' && body.startsWith(prefix)) ? body : (((type === 'image' || type === 'video' ) && body) && body.startsWith(prefix)) ? body : ''
		if(chatss == undefined || chatss == '') return
		const commands = chatss || "";
		//console.log(chats)
		const comman = commands.toLowerCase()
			.split(" ")[0] || "";
		command = comman && comman.startsWith(prefix) ? comman.split(prefix)[1] : "";
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
			m.hasQuotedMsg ? m._data.quotedMsg.sender = m._data.quotedParticipant : {}
			m.command = command
			m.parseMention = async(text) => {
				return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@c.us')
			}
		const args = chats.trim()
			.split(/ +/)
			.slice(1);
		const q = args.join(" ");
		const fail = {
			owner: "Perintah ini hanya bisa dilakukan oleh Owner!",
			private: "Perintah ini hanya bisa dilakukan di private chat!",
			group: "Perintah ini hanya bisa dilakukan di group!",
			admin: "Perintah ini hanya bisa dilakukan oleh Admin Group!",
			botAdmin: "Jadikan bot admin terlebih dahulu!",
			disabled: "Fitur dinonaktifkan, Mungkin dikarenakan ada error\nSilahkan tunggu beberapa saat"
		};
		global.mess = {
		    wait: 'Tunggu sebentar, permintaan anda sedang diproses..',
		    errorlink: 'Link tidak valid!!',
			error: 'command error, mohon lapor kepada owner!!',
			oversize: 'Size terlalu besar, Silahkan download menggunakan link diatas!'
		}
		global.eror = (command, err, msg) => {
			eror = `Fitur Error\n\n`
			eror += `${global.shp} command : ${command}\n\n`
			eror += `Error Log\n\n`
			eror += String(err)
			msg.reply(global.mess.error)
			conn.sendText(config.owner, eror);
		}
		const log = async (logg) => {
			if(conn.mode == 'self'){
				console.log(chalk.green(moment.tz("Asia/Jakarta")
					.format("DD/MM/YY HH:mm:ss")) + " " + chalk.red("[ S E L F ]") + " " + chalk.cyanBright(m.type) + ": " + chalk.yellowBright(" from: " + m._data.notifyName) + " chat: " + chalk.greenBright(logg));
			}else console.log(chalk.green(moment.tz("Asia/Jakarta")
			.format("DD/MM/YY HH:mm:ss")) + " " + chalk.red("[ P U B L I C ]") + " " + chalk.cyanBright(m.type) + ": " + chalk.yellowBright(` from: ${m._data.notifyName} In ${zx.isGroup ? zx.name : 'Private Chat'}`) + " chat: " + chalk.greenBright(logg));
	
		};
		const isOwner = config.owner.includes(zx.isGroup ? m.author : m.from);
		require('./function/function').func(m, conn, zx)
		if(conn.mode == 'self' && !isOwner) return
		if(command != undefined && command != '' && config.antispam && !isOwner){
			spam = await Object.values(global.commands).find(sp => !sp.function && !sp.disabled && sp.cmd && sp.cmd.includes(command))
			if(spam == undefined) return
			conn.cooldown = conn.cooldown ? conn.cooldown : {}
			if(m.sender in conn.cooldown){
				sisa = await ms(conn.cooldown[m.sender].timestamp - Date.now())
				return zx.sendMessage(`_command sedang cooldown.._\n_Silahkan tunggu *${sisa.seconds},${sisa.milliseconds}* detik_`, {quotedMessageId: m.id._serialized})
			}
		}
		const admin = zx.isGroup ? zx.participants.filter(s => s.isAdmin).map(s => s.id._serialized) : {}
		const extra = {
			q,
			text: q,
			budy,
			botNumber: conn.info.wid._serialized,
			quotedMsg: _data.quotedMsg,
			msgId: m.id._serialized,
			args,
			command,
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
		const isAdmin = zx.isGroup ? admin.includes(m.author) : false;
		const isBotAdmin = zx.isGroup ? admin.includes(conn.info.wid._serialized) : false;

		//exec command
		//console.log(m.id)
		//if(m.isBot) return
		cmds = await Object.values(global.commands).find((rescmd) => !rescmd.function && !rescmd.antispam && !rescmd.disabled && rescmd.cmd.includes(command))
		//console.log(cmds)
		dbuser = db.collection('users')
		userdb = await dbuser.findOne({id: m.sender})
		if(userdb == null){
			dbuser.insertOne({
				id: m.sender,
				limit: 0,
				balance: 0
			})
		} 
		if(cmds == undefined) return
		const isCheck = await conn.msgdata.filter(chk => chk.msgId == m.id._serialized && chk.sender == m.sender && chk.caption.startsWith(prefix + command) && chk.caption == budyy) // && chk.caption.startsWith(prefix + command) && chk.caption == budy
		if(isCheck == '') return console.log(`Conflict Command ${command} In ${zx.isGroup ? zx.name : m.from}`)
		if(!isOwner && m.sender in conn.cooldown){
			sisa = await ms(conn.cooldown[m.sender].timestamp - Date.now())
			return zx.sendMessage(`_command sedang cooldown.._\n_Silahkan tunggu *${sisa.seconds},${sisa.milliseconds}* detik_`, {quotedMessageId: m.id._serialized})
		}
		zx.sendSeen()
		antispam = require('../commands/_antispam')
		antispam.handler(m, extra)
		try{
			const sfail = async (mm, p) => {
				await mm.reply(fail[p]);
			};
			log(command)
			if (cmds.owner && !isOwner) return sfail(m, "owner");
			if (cmds.private && zx.isGroup) return sfail(m, "private");
			if (cmds.group && !zx.isGroup) return sfail(m, "group");
			if (cmds.admin && !isOwner && !isAdmin) return sfail(m, "admin");
			if (cmds.botAdmin && !isBotAdmin) return sfail(m, "botAdmin");
			require('./database/hit').addhit(cmds.name[0].split(' ')[0], m.sender)
			await cmds.handler(m, extra)
		}catch(e){
			eror = `Fitur Error\n\n`
			eror += `${global.shp} command : ${cmds.name}\n\n`
			eror += `Error Log\n\n`
			eror += String(e)
			conn.sendText(config.owner, eror);
		}
	},
};
let file = require.resolve(__filename);
fs.watchFile(file, () => {
	fs.unwatchFile(file);
	console.log(chalk.redBright("Update 'worker.js'"));
	delete require.cache[file];
	if (global.reload) console.log(global.reload());
});