const { db } = require('./database')
class hitfc {
  static addhit = async (cmd, sender) => {
    let cekhit = await db.collection('hit').findOne({ cmd: cmd })
    if (cekhit !== null) {
        const userarray = cekhit.user
        const pos = await userarray.findIndex(x => x.id == sender)
        if(pos == '-1'){
            userarray.push({id: sender, count: 1})
            return db.collection('hit').updateOne({
                cmd: cmd
            },
            {
                $set: {
                    count: cekhit.count + 1,
                    user:userarray
                }
            }
            )
        }
        userarray[pos].count = userarray[pos].count + 1
      return db
        .collection('hit')
        .updateOne(
          {
            cmd: cmd,
          },
          {
            $set: {
              count: cekhit.count + 1,
              user: userarray
            },
          }
        )
        .then((res, err) => {
          if (err) return console.log('Failed replace Property hit')
        })
    }
    db.collection('hit').insertOne(
      {
        cmd: cmd,
        count: 1,
        user:[{id: sender, count: 1}]
      },
      (err, res) => {
        if (err) return console.log('Failed Add Property')
      }
    )
  }
  static showhit = async (opt) => {
    return db.collection('hit').find(opt).toArray()
  }
}
module.exports = hitfc
const fs = require('fs')
let file = require.resolve(__filename);
fs.watchFile(file, () => {
	fs.unwatchFile(file);
	console.log("Update 'hit.js'");
	delete require.cache[file];
	if (global.reload) console.log(global.reload());
});