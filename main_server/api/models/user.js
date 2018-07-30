var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    _id: {
        type: mongoose.SchemaTypes.ObjectId
    },
    name: {
        type: 'String',
        require: true
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);