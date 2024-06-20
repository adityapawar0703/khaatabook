const mongoose = require('mongoose')

const hisaabSchema = mongoose.Schema({
    title:String,
    data:String,
    user:String,
    password:String,
    editeable: Boolean,
    shareable:Boolean,
    encrypted:Boolean,
    passcode:String,
});

module.exports = mongoose.model("hisaab",hisaabSchema)