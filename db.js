const mongoose = require('mongoose');
const constants = require('./constants');


mongoose.connect(constants.dburl, (err)=>{
    if (err){
        console.log("Error connecting to db! " + JSON.stringify(err));
    }
});


module.exports = mongoose;
