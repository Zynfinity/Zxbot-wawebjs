const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const moment = require("moment-timezone");
const config = require("./config");
const ms = require('parse-ms');
const djs = require("@discordjs/collection");
module.exports = {
	async handler(m, conn) {
		const zx = await m.getChat()
		zx.sendSeen()
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
		budy = (type === 'chat') ? body : (((type === 'image' || type === 'video' || type === 'buttons_response') && body)) ? body : type === 'list_response' ? m.selectedRowId : ''
		const prefix = /^[#./\\]/.test(budy) ? budy.match(/^[#./\\]/gi) : '.'
		chats = type === 'list_response' ? m.selectedRowId : (type === 'chat' && body.startsWith(prefix)) ? body : (((type === 'image' || type === 'video' ) && body) && body.startsWith(prefix)) ? body : ''
		const commands = caption || chats || "";
		if(m.type != 'chat' && m.type != 'video' && m.type != 'image' && m.type != 'list_response') return
		const comman = commands.toLowerCase()
			.split(" ")[0] || "";
		command = comman && comman.startsWith(prefix) ? comman.split(prefix)[1] : "";
		m.command = command
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
		const sfail = async (p) => {
			await m.reply(fail[p]);
		};
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
			.format("DD/MM/YY HH:mm:ss")) + " " + chalk.red("[ P U B L I C ]") + " " + chalk.cyanBright(m.type) + ": " + chalk.yellowBright(" from: " + m._data.notifyName) + " chat: " + chalk.greenBright(logg));
	
		};
		const isOwner = config.owner.includes(zx.isGroup ? m.author : m.from);
		require('./function/function').func(m, conn, zx)
		if(conn.mode == 'self' && !isOwner) return
		if(command != undefined && command != '' && !isOwner){
			spam = await djs.commands.find(sp => !sp.function && !sp.disabled && sp.cmd && sp.cmd.includes(command))
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
		for(fungsi of await djs.commands.filter(fc => fc.function && !fc.antispam && !fc.disabled)){
			await fungsi[1].handler(m, extra)
		}
		if(command == undefined || command == '') return
		//console.log('no command')
		const isAdmin = zx.isGroup ? admin.includes(m.author) : false;
		const isBotAdmin = zx.isGroup ? admin.includes(conn.info.wid._serialized) : false;

		//exec command
		//console.log(m.id)
		//if(m.isBot) return
		/*for (name in global.plugins) {
			plugin = global.plugins[name];
			if(!plugin.function && !plugin.disabled && !plugin.antispam){
				//let isAccept = plugin.cmd instanceof RegExp ? plugin.cmd.test(command) : Array.isArray(plugin.cmd) ? plugin.cmd.some((cmd) => cmd instanceof RegExp ? cmd.test(command) : cmd === command) : typeof plugin.cmd === "string" ? plugin.cmd === command : false;
				try{
					isAccept = plugin.cmd.includes(command)
				}catch(e){
					console.log(e)
					console.log(plugin.name)
				}
				if (!isAccept) continue;
				spam = await global.plugins['_antispam.js']
				await spam.handler(m, extra)
				try {
					log(command);
					//if (plugin.disabled) return sfail('disabled')
					if (plugin.owner && !isOwner) return sfail("owner");
					if (plugin.private && zx.isGroup) return sfail("private");
					if (plugin.group && !zx.isGroup) return sfail("group");
					if (plugin.admin && !isOwner && !isAdmin) return sfail("admin");
					if (plugin.botAdmin && !isBotAdmin) return sfail("botAdmin");
					require('./database/hit').addhit(plugin.name[0].split(' ')[0], m.sender)
					return await plugin.handler(m, extra);
				} catch (e) {
					eror = `Fitur Error\n\n`
					eror += `${global.shp} command : ${plugin.name}\n\n`
					eror += `Error Log\n\n`
					eror += String(e)
					conn.sendText(config.owner, eror);
				}
			}
		}*/
		cmds = djs.commands.find((rescmd) => !rescmd.function && !rescmd.antispam && !rescmd.disabled && rescmd.cmd.includes(command))
		if(cmds == undefined) return
		antispam = await djs.commands.find(spm => spm.antispam)
		await antispam.handler(m, extra)
		try{
			log(command)
			if (cmds.owner && !isOwner) return sfail("owner");
			if (cmds.private && zx.isGroup) return sfail("private");
			if (cmds.group && !zx.isGroup) return sfail("group");
			if (cmds.admin && !isOwner && !isAdmin) return sfail("admin");
			if (cmds.botAdmin && !isBotAdmin) return sfail("botAdmin");
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