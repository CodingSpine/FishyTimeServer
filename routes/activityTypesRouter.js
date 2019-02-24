const express = require('express');
const activityTpesRouter = express.Router();
const {User} = require('./models/user');
const {ActivityType} = require('./models/activityType');


/*
Goals to be accomplished in this router:
1. Fetch all activity types. √
2. Post a new activity type. √
3. Delete an activity type. √
*/

activityTpesRouter.get('/', (req, res) => {
    ActivityType.find().then(activityTypes => {
        return res.status(200).json(activityTypes);
    });
});

activityTpesRouter.post('/', (req, res) => {
    if(!req.body.type){
        return res.status(422).json({
            error: "Expected a 'type' value"
        });
    }
    ActivityType.find({type : { $regex : new RegExp(req.body.type, "i") } }})
        .then(docs => {
            if (docs.length){
                return res.status(405).json({
                    error: "Activity type already exists"
                });
            }
            else {
                let newActivityType = new ActivityType({type: req.body.type});
                newActivityType.save().then(doc => {
                    return res.status(201).json({
                        msg: "Created",
                        activityType: doc
                    });
                }).catch(err => {
                    return res.status(500).json({
                        error: err
                    });
                });
            }
        });
});

activityTpesRouter.delete('/:id', (req, res) => {
    if (!req.params.id){
        return res.status(422).json({
            error: 'ActivityType ID is required'
        });
    }
    ActivityType.findByIdAndDelete({
        _id: id
    }, (req, res) => {
        return res.status(200).json({
            msg: 'Activity deleted'
        });
    });
});



module.exports = activityTpesRouter;
