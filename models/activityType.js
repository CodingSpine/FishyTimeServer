const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    type: {type: String, trim: true, required: true}
});


var ActivityType = mongoose.model('ActivityType', schema);


module.exports = {
    ActivityType
};
