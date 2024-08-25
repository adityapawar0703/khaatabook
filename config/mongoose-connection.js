const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_DB_URI,{
    useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true,
}).then(function(){
    console.log("connected to mongoDB")
})
 let db = mongoose.connection
module.exports = db;
