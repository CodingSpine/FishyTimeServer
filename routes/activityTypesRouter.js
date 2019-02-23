const express = require('express');
const activityTpesRouter = express.Router();
const {User} = require('./models/user');
const {ActivityType} = require('./models/activityType');


/*
Goals to be accomplished in this router:
1. Fetch all activity types. √
2. Post a new activity type.
3. Delete an activity type. √
*/

router.get('/', (req, res) => {
    ActivityType.find().then(activityTypes => {
        return res.status(200).json(activityTypes);
    });
});

router.delete('/:id', (req, res) => {
    if (!req.params.id){
        return res.status(422).json({
            error: 'ActivityType ID is required'
        });
    }
    Activity.findByIdAndDelete({
        _id: id
    }, (req, res) => {
        return res.status(202).json({
            msg: 'Activity deleted'
        });
    });
});



module.exports = activityTpesRouter;
