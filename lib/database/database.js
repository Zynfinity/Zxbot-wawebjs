const {
	MongoClient
} = require("mongodb");
const uri = require('../config').mongourl
if(uri == '' || uri == undefined) throw console.error('Please insert mongodb url')
const client = new MongoClient(uri);
const db = client.db('database_bot');
function connectToDatabase(){
	return new Promise((resolve, reject) => {
    	client.connect(async (error, client) => {
			if (error) return console.log('Koneksi Gagal')
			console.log('Koneksi Ke Database Mongo Berhasil')
			resolve(client)
		});
	})
}
function adddata(data_name, data){
	db.collection(data_name).insertOne(data)
}
function showdata(data_name, data_value){
	return new Promise(async (resolve, reject) => {
	db.collection(data_name).find(data_value).toArray((error, result) => {
		if (error) return console.log(error)
		resolve(result)
	})
	})
}
function deletedata(data_name, data){
	return new Promise(async (resolve, reject) => {
		db.collection(data_name).deleteOne(data).then((result) => {
				resolve(result)
			})
			.catch((error) => {
				resolve(error)
			})
	})
}
module.exports = {db, connectToDatabase, showdata, adddata, deletedata}
const fs = require('fs')
let file = require.resolve(__filename);
fs.watchFile(file, () => {
	fs.unwatchFile(file);
	console.log("Update 'database.js'");
	delete require.cache[file];
	if (global.reload) console.log(global.reload());
});
