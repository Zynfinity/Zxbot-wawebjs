const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const moment = require("moment-timezone");
const config = require("./config");
module.exports = {
	async handler(m, conn) {
        require('./function/function').func(m, conn)
		conn.getAmountOfLoadedMessages().then(re => {
			if(re >= 1000){
				conn.cutChatCache().then(s => console.log(s))
			}
		})
		prefix = ".";
		global.shp = "⬡";
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
			mentionedJidList,
		} = m;
		chats = (type === 'chat' && body.startsWith(prefix)) ? body : (((type === 'image' || type === 'video' || type === 'buttons_response') && caption) && caption.startsWith(prefix)) ? caption : ''
		const commands = caption || chats || "";
		const comman = commands.toLowerCase()
			.split(" ")[0] || "";
		const command = comman ? comman.split(prefix)[1] : "";
		const args = chats.trim()
			.split(/ +/)
			.slice(1);
		const q = args.join(" ");
		const isAdmin = m.isGroupMsg ? await conn.getGroupAdmins(m.from)
			.then((s) => s.includes(m.sender.id)) : false;
		const isBotAdmin = m.isGroupMsg ? await conn.iAmAdmin()
			.then((s) => s.includes(m.from)) : false;
		const isOwner = config.owner.includes(m.sender.id);
		const extra = {
			q,
			text: q,
			args,
			command,
			conn: conn,
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
			mentionedJidList,
		};
		const fail = {
			owner: "Perintah ini hanya bisa dilakukan oleh Owner!",
			private: "Perintah ini hanya bisa dilakukan di private chat!",
			group: "Perintah ini hanya bisa dilakukan di group!",
			admin: "Perintah ini hanya bisa dilakukan oleh Admin Group!",
			botAdmin: "Jadikan bot admin terlebih dahulu!",
		};
		global.mess = {
		    wait: 'Tunggu sebentar, permintaan anda sedang diproses..',
		    errorlink: 'Link tidak valid!!',
error: 'Command error, mohon lapor kepada owner!!'
		}
		const sfail = async (p) => {
			conn.reply(m.from, fail[p], m.id);
		};
		const log = async (logg) => {
			console.log(chalk.green(moment.tz("Asia/Jakarta")
				.format("DD/MM/YY HH:mm:ss")) + " " + chalk.red("[ P U B L I C ]") + " " + chalk.cyanBright(m.type) + ": " + chalk.yellowBright(" from: " + m.sender.pushname) + " chat: " + chalk.greenBright(logg));
		};
		//exec command
		//console.log(m.id)
		if(m.isBot) return
		for (name in global.plugins) {
			plugin = global.plugins[name];
			if(plugin.function){
				await plugin.handler(m, extra)
			}
			else{
			let isAccept = plugin.cmd instanceof RegExp ? plugin.cmd.test(command) : Array.isArray(plugin.cmd) ? plugin.cmd.some((cmd) => cmd instanceof RegExp ? cmd.test(command) : cmd === command) : typeof plugin.cmd === "string" ? plugin.cmd === command : false;
			if (!isAccept) continue;
			try {
				log(command);
                if (plugin.disabled) return
				if (plugin.owner && !isOwner) return sfail("owner");
				if (plugin.private && m.isGroupMsg) return sfail("private");
				if (plugin.group && !m.isGroupMsg) return sfail("group");
				if (plugin.admin && !isOwner && !isAdmin) return sfail("admin");
				if (plugin.botAdmin && !isBotAdmin) return sfail("botAdmin");
				await plugin.handler(m, extra);
			} catch (e) {
				eror = `Fitur Error\n\n`
				eror += `${global.shp} Command : ${plugin.name}\n\n`
				eror += `Error Log\n\n`
				eror += String(e)
				conn.sendText(config.owner[0], eror);
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