var mongoose =  require('mongoose');

var UserSchema = new mongoose.Schema({
    name: String,
    addrress: String
})

mongoose.model('Address', UserSchema);
module.exports = mongoose.model('Address')