const {listsurat, surat} = require('../lib/scraper')
module.exports = {
    name: ['surah'].map((v) => v + ' <no surah>'),
    cmd: ['surah','surat'],
    category: 'islamic',
    desc: ['Menampilkan surah berdasarkan nomor surah', '.surah <no surah>'],
    async handler(m, {conn,  msgId, args}){
        if (!args[0]) return await m.reply("masukkan nomor suratnya!");
        if (isNaN(args[0])) return await m.reply("Input harus berupa nomor!");
        if (args[0] > 114) return await m.reply("surat al-quran hanya berjumlah 114!");
        list = await listsurat();
        filt = await list.filter((res) => res.no == args[0]);
        res = await surat(filt[0].surah);
        teks = shp + ` *Surah ${res.surat} Ayat 1 - ${res.result.length}\n\n`;
        num = 1;
        for (let i of res.result) {
            teks += num + ".  " + i.arabic + "\n\n";
            teks += "_Artinya : " + i.arti + "_\n\n------------------------------\n\n";
            num += 1;
        }
        m.reply(teks);
    }
}