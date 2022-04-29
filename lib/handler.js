const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const moment = require("moment-timezone");
const config = require("./config");
const ms = require('parse-ms');
const {db} = require('./database/database');
const { sleep } = require("./tools");
const rzkyClient = require('rzkyfdlh-api')
module.exports = {
	async handler(m, conn) {
		const data = JSON.parse(fs.readFileSync('./lib/json/data.json'))
		const database = require('./database/database')
		global.db = database.db
		global.dbs = require('./database/database')
		global.tools = require('./tools')
		global.scrapp = require('./scraper')
		global.zapi = require('zxy-api')
		global.caliph = require('caliph-api')
		global.rzky = new rzkyClient('1ibl8r4kz37x4to6h8r3uxl472o88bmvg49822xd8779q31bck')
		global.axios = require('axios')
		const {igApi, getSessionId} = require('insta-fetcher')
		global.instagram = new igApi('mid=YjSZVwAEAAE7KZe70xhrVCaenePm; ig_did=3592CDC8-44F7-43C7-AFE7-CF2F22225A76; ig_nrcb=1; shbid="10275\0548779859677\0541682665474:01f7f147d206684022c4a024d6cbb639573b96be34997c16b4a7e34d4daafac675197983"; shbts="1651129474\0548779859677\0541682665474:01f7536a8e4833122a5a09925cc7f807450815c48fc11aeb5821e878789ae62c6b9c42e0"; csrftoken=GDyHTfEZTLIkJnnEe3LrkRdfksICnY5l; ds_user_id=38294838667; sessionid=38294838667%3A7fB2Tjs0DG2xMb%3A27; rur="EAG\05438294838667\0541682667392:01f7964cefdff61b576afececed29f1f8f718e02a8ae279d5f2811f126af501693000a80"')
		global.ig = instagram
		const zx = await m.getChat()
		require('./function/function').func(m, conn, zx)
		conn.mode = conn.mode ? conn.mode : 'public'
		if(zx.isGroup){
			const user = await m.getContact()
			const mute = JSON.parse(fs.readFileSync('./lib/json/data.json'))
			if(user.isBlocked) return
		}
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
		if((m.command == 'unmute' || m.command == 'mute') && data.mute.includes(m.from) && (isOwner || isAdmin)){
			return require('../commands/mute.js').handler(m, conn)
		}
		//exec command
		//console.log(m.id)
		//if(m.isBot) return
		const cmds = await Object.values(global.commands).find(rescmd => !rescmd.disabled && rescmd.cmd.includes(command))
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
			const isCheck = await conn.msgdata.filter(chk => chk.msgId == m.msgId && chk.sender == m.sender && chk.caption.startsWith(prefix + command) && chk.caption == budyy) // && chk.caption.startsWith(prefix + command) && chk.caption == budy
			if(isCheck == '') return console.log(`Conflict Command ${command} In ${zx.isGroup ? zx.name : m.from}`)
			if(data.mute.includes(m.from) && !isOwner) return
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
				games = data.game.find(gem => gem == m.from)
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