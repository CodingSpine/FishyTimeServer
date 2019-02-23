const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    startTime: {type: Date, required: true},
    endTime: {type: Date, required: true},
    duration: Number,
    username: { type: Schema.Types.ObjectId, ref: 'User' },
    activity: { type: Schema.Types.ObjectId, ref: 'ActivityType' }
});


var Activity = mongoose.model('Activity', schema);


module.exports = {
    Activity
};
