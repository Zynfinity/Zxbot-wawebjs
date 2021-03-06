const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const moment = require("moment-timezone");
const config = require("./config");
const ms = require('parse-ms');
const {db} = require('./database/database');
const { sleep } = require("./tools");
const rzkyClient = require('ikyy')
module.exports = {
	async handler(m, conn) {
		const data = JSON.parse(fs.readFileSync('./lib/json/data.json'))
		const mute = JSON.parse(fs.readFileSync('./lib/json/mute.json'))
		const dgame = JSON.parse(fs.readFileSync('./lib/json/game.json'))
		const database = require('./database/database')
		global.db = database.db
		global.dbs = require('./database/database')
		global.tools = require('./tools')
		global.scrapp = require('./scraper')
		global.zapi = require('zxy-api')
		global.caliph = require('caliph-api')
		global.rzky = new rzkyClient()
		global.axios = require('axios')
		const {igApi, getSessionId} = require('insta-fetcher')
		global.instagram = new igApi('mid=YnDVQgAEAAH2kcEUBFqJ7vUIe-WQ; ig_did=3B36BABC-3065-43B3-93B8-625CFD6D34BE; ig_nrcb=1; csrftoken=W68tMp0WQsUYcCLbHR7YA89bvSHFGUks; ds_user_id=52733102147; sessionid=52733102147%3Aj2DqtvnkC43uKW%3A0; rur="PRN\05452733102147\0541683097937:01f782d302233acf67dad795281823029baf1c056442751e0d04c8d93bba18895e039de0"')
		global.ig = instagram
		const zx = await m.getChat()
		require('./function/function').func(m, conn, zx)
		conn.mode = conn.mode ? conn.mode : 'public'
		if(zx.isGroup){
			const user = await m.getContact()
			if(user.isBlocked) return
		}
		if(m.sender.startsWith('2')) return
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
		const budy = (type === 'chat') ? body : (((type === 'image' || type === 'video') && body)) ? body : type === 'list_response' ? m.selectedRowId : ''
		//const prefix = /^[#./\\]/.test(budy) ? budy.match(/^[#./\\]/gi) : '.'
		prefix = '.'
		const chats = type === 'list_response' ? m.selectedRowId : (type === 'chat' && body.startsWith(prefix)) ? body : (((type === 'image' || type === 'video' ) && body) && body.startsWith(prefix)) ? body : ''
		if(chats == undefined || chats == '') return
		const budyy = (type === 'chat') ? body : (((type === 'image' || type === 'video') && body)) ? body : type === 'list_response' ? m.selectedRowId : ''
		const chatss = type === 'list_response' ? m.selectedRowId : (type === 'chat' && body.startsWith(prefix)) ? body : (((type === 'image' || type === 'video' ) && body) && body.startsWith(prefix)) ? body : ''
		if(chatss == undefined || chatss == '') return
		//console.log(chats)
		const comman = chatss.toLowerCase()
			.split(" ")[0]
		const command = comman && comman.startsWith(prefix) ? comman.split(prefix)[1] : "";
		m.command = command
		const args = chats.trim()
			.split(/ +/)
			.slice(1);
		const q = args.join(" ");
		const fail = {
			game: "Mode game tidak diaktifkan digroup ini\nKetik .game on utuk mengaktifkan!",
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
			error: 'command error, mohon lapor kepada owner dengan .bugreport <bugnya>!!',
			oversize: 'Size terlalu besar, Silahkan download menggunakan link diatas!'
		}
		global.eror = (command, err, msg) => {
			eror = `Fitur Error\n\n`
			eror += `${global.shp} command : ${command}\n\n`
			eror += `Error Log\n\n`
			eror += String(err)
			if(String(err).includes("Cannot read property 'data' of undefined")) return msg.reply('no media found, please resend the media')
			if(String(err).includes("(reading 'mediaData')")) return msg.reply('Error, silahkan kirim ulang media, lalu ulangi commandnya!')
			else msg.reply(global.mess.error)
			conn.sendText(config.owner, eror, {quotedMessageId: msg.msgId});
		}
		const log = async (logg) => {
			if(conn.mode == 'self'){
				console.log(chalk.green(moment.tz("Asia/Jakarta")
					.format("DD/MM/YY HH:mm:ss")) + " " + chalk.red("[ S E L F ]") + " " + chalk.cyanBright(m.type) + ": " + chalk.yellowBright(" from: " + m._data.notifyName) + " chat: " + chalk.greenBright(logg));
			}else console.log(chalk.green(moment.tz("Asia/Jakarta")
			.format("DD/MM/YY HH:mm:ss")) + " " + chalk.red("[ P U B L I C ]") + " " + chalk.cyanBright(m.type) + ": " + chalk.yellowBright(` from: ${m._data.notifyName} In ${zx.isGroup ? zx.name : 'Private Chat'}`) + " chat: " + chalk.greenBright(logg));
	
		};
		const isOwner = config.owner.includes(zx.isGroup ? m.author : m.from);
		if(conn.mode == 'self' && !isOwner) return
		const admin = zx.isGroup ? zx.participants.filter(s => s.isAdmin).map(s => s.id._serialized) : {}
		const isAdmin = zx.isGroup ? admin.includes(m.author) : false;
		const isBotAdmin = zx.isGroup ? admin.includes(conn.info.wid._serialized) : false;
		const extra = {
			isAdmin,
			q,
			text: q,
			budy,
			botNumber: conn.info.wid._serialized,
			quotedMsg: m.quoted,
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
		if((m.command == 'unmute' || m.command == 'mute') && mute.includes(m.from) && (isOwner || isAdmin)){
			return require('../commands/mute.js').handler(m, conn)
		}
		//exec command
		//console.log(m.id)
		//if(m.isBot) return
		const cmds = await Object.values(global.commands).find(rescmd => !rescmd.function && !rescmd.disabled && rescmd.cmd && rescmd.cmd.includes(command.toLowerCase()))
		//console.log(cmds)
		//fcommand = cmds.cmd.find(coman => coman == command)
		if(cmds == undefined) {
			return require('../commands/_typo.js').handler(m, extra)
		}
		dbuser = db.collection('users')
		userdb = await dbuser.findOne({id: m.sender})
		if(userdb == null){
			dbuser.insertOne({
				id: m.sender,
				limit: 0,
				balance: 0
			})
		} 
		try{
			const sfail = async (mm, p) => {
				await m.reply(fail[p]);
			};
			const isCheck = await conn.msgdata.filter(chk => chk.msgId == m.msgId && chk.sender == m.sender && chk.caption.toLowerCase().startsWith(prefix + command.toLowerCase()) && chk.caption == budyy) // && chk.caption.toLowerCase().startsWith(prefix + command.toLowerCase()) && chk.caption == budy
			if(isCheck == '') return console.log(`Conflict Command ${command} In ${zx.isGroup ? zx.name : m.from}`)
			if(mute.includes(m.from) && !isOwner) return
			if(!isOwner && m.sender in conn.cooldown){
				sisa = await ms(conn.cooldown[m.sender].timestamp - Date.now())
				return zx.sendMessage(`_command sedang cooldown.._\n_Silahkan tunggu *${sisa.seconds}* detik_`, {quotedMessageId: m.id._serialized})
			}
			log(command)
			if (cmds.owner && !isOwner) return sfail(m, "owner");
			if (cmds.private && zx.isGroup) return sfail(m, "private");
			if (cmds.group && !zx.isGroup) return sfail(m, "group");
			if (cmds.admin && !isOwner && !isAdmin) return sfail(m, "admin");
			if (cmds.botAdmin && !isBotAdmin) return sfail(m, "botAdmin");
			if(cmds.game && zx.isGroup){
				if(!data.game) return m.reply('Mode game dinonaktifkan untuk semua group!')
				games = dgame.find(gem => gem == m.from)
				if(games == undefined) return sfail(m, 'game')
				isgame = conn.game.family[m.from] != undefined ? true : conn.game.tebakgambar[m.from] != undefined ? true : conn.game.tebakkata[m.from] != undefined ? true : conn.game.susunkata[m.from] != undefined ? true : false
				if(isgame && !budy.includes('-nyerah')) return m.reply('Masih ada permainan lain yang berjalan di group ini,\nSelesaikan terlebih dahulu!')
			}
			await cmds.handler(m, extra)
			zx.sendSeen()
			require('../commands/_antispam').handler(m, extra)
			require('./database/hit').addhit(cmds.name.length == 1 ? cmds.name[0].split(' ')[0] : cmds.cmd.find(coman => coman == command), m.sender)
		}catch(e){
			eror = `Fitur Error\n\n`
			eror += `${global.shp} command : ${cmds.cmd.find(coman => coman == command)}\n\n`
			eror += `Error Log\n\n`
			eror += String(e)
			conn.sendText(config.owner, eror, {quotedMessageId: m.msgId});
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