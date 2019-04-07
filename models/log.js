const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    username: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    weekNumber: {type: Number, required: true},
    year: {type: Number, required: true},
    loggedallhours: {type: Boolean, required: true}
});


var Log = mongoose.model('Log', schema);


module.exports = {
    Log
};
