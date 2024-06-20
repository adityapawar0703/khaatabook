const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/khaatabook")
.then(function(){
    console.log("connected to server")
})

module.exports = mongoose.connection;