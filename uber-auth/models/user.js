var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    first_name: {type: String, required: false },
    last_name: {type: String, required: false },
    promo_code: {type: String, required: false },
    email: {type: String, required: false },
    uuid: {type: String, required: false },
    provider: {type: String, required: false }
});
UserSchema.plugin(findOrCreate);
module.exports = mongoose.model('User', UserSchema);