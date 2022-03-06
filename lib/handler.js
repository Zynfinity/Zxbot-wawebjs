const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const moment = require("moment-timezone");
const config = require("./config");
module.exports = {
	async handler(m, conn) {
		const zx = await m.getChat()
		if(zx.isGroup){
			const user = await m.getContact()
			if(user.isBlocked) return
		}
  		require('./function/function').func(m, conn, zx)
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
		budy = (type === 'chat') ? body : (((type === 'image' || type === 'video' || type === 'buttons_response') && body)) ? body : ''
		const prefix = /^[°$×=|~zZ+×!#%./\\]/.test(budy) ? budy.match(/^[°$×=|~zZ+×!#%./\\]/gi) : '.'
		chats = (type === 'chat' && body.startsWith(prefix)) ? body : (((type === 'image' || type === 'video' || type === 'buttons_response') && body) && body.startsWith(prefix)) ? body : ''
		const commands = caption || chats || "";
		const comman = commands.toLowerCase()
			.split(" ")[0] || "";
		global.command = comman ? comman.split(prefix)[1] : "";
		const args = chats.trim()
			.split(/ +/)
			.slice(1);
		const q = args.join(" ");
		const botNumber = await conn.info.wid._serialized
		const admin = zx.isGroup ? await zx.participants.filter(s => s.isAdmin).map(s => s.id._serialized) : {}
		const isAdmin = zx.isGroup ? admin.includes(m.author) : false;
		const isBotAdmin = zx.isGroup ? admin.includes(botNumber) : false;
		const isOwner = config.owner.includes(zx.isGroup ? m.author : m.from);
		const mimetype = _data.mimetype
		const extra = {
			q,
			text: q,
			botNumber,
			quotedMsg: _data.quotedMsg,
			args,
			command,
			mimetype,
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
			isUrl
		};
		const fail = {
			owner: "Perintah ini hanya bisa dilakukan oleh Owner!",
			private: "Perintah ini hanya bisa dilakukan di private chat!",
			group: "Perintah ini hanya bisa dilakukan di group!",
			admin: "Perintah ini hanya bisa dilakukan oleh Admin Group!",
			botAdmin: "Jadikan bot admin terlebih dahulu!"
		};
		global.mess = {
		    wait: 'Tunggu sebentar, permintaan anda sedang diproses..',
		    errorlink: 'Link tidak valid!!',
			error: 'Command error, mohon lapor kepada owner!!',
			oversize: 'Size terlalu besar, Silahkan download menggunakan link diatas!'
		}
		const sfail = async (p) => {
			m.reply(fail[p]);
		};
		global.error = (command, err, msg) => {
			eror = `Fitur Error\n\n`
			eror += `${global.shp} Command : ${command}\n\n`
			eror += `Error Log\n\n`
			eror += String(err)
			msg.reply(global.mess.error)
			conn.sendText(config.owner, eror);
		}
		const log = async (logg) => {
			console.log(chalk.green(moment.tz("Asia/Jakarta")
				.format("DD/MM/YY HH:mm:ss")) + " " + chalk.red("[ P U B L I C ]") + " " + chalk.cyanBright(m.type) + ": " + chalk.yellowBright(" from: " + m._data.notifyName) + " chat: " + chalk.greenBright(logg));
		};
		//exec command
		//console.log(m.id)
		if(m.isBot) return
		for (name in global.plugins) {
			plugin = global.plugins[name];
			if(!plugin.disabled){
				if(plugin.function){
					await plugin.handler(m, extra)
				}
				else{
					let isAccept = plugin.cmd instanceof RegExp ? plugin.cmd.test(command) : Array.isArray(plugin.cmd) ? plugin.cmd.some((cmd) => cmd instanceof RegExp ? cmd.test(command) : cmd === command) : typeof plugin.cmd === "string" ? plugin.cmd === command : false;
					if (!isAccept) continue;
					try {
						log(command);
						if (plugin.owner && !isOwner) return sfail("owner");
						if (plugin.private && !zx.isGroup) return sfail("private");
						if (plugin.group && !zx.isGroup) return sfail("group");
						if (plugin.admin && !isOwner && !isAdmin) return sfail("admin");
						if (plugin.botAdmin && !isBotAdmin) return sfail("botAdmin");
						await plugin.handler(m, extra);
					} catch (e) {
						eror = `Fitur Error\n\n`
						eror += `${global.shp} Command : ${plugin.name}\n\n`
						eror += `Error Log\n\n`
						eror += String(e)
						conn.sendText(config.owner, eror);
					}
				}
			}
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