const express = require('express');
const activitiesRouter = express.Router();
const {User} = require('./../models/user');
const {Activity} = require('./../models/activity');
const Moment = require('moment');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);


/*
Goals to be accomplished in this router:
1. Fetch all activities for a user. √
2. Post a new activity for a user.
    2.1 This activity needs to have startTime, endTime, username, and activity name as mandatory values.
    2.2 The duration needs to be calculated before it is sent to db.
    2.3 If an activity's duration partially or completely overlaps another activity's, it should throw an error. (How do we achieve this? - Look into momentJS)
    2.4 After posting a new activity, the 'log' table needs to be checked to see if the current week has been logged for 20 hours. If yes, then the 'loggedallhours' value needs to be udpated to 'true'
3. Update an activity.
4. Delete an activity. √
*/

activitiesRouter.get('/:username', (req, res) => {
    let username = req.params.username;
    User.findOne({
        username: username
    }, (err, doc) => {
        if (doc === null){
            return res.status(401).json({
                error: 'User does not exist'
            });
        }
        else {
            Activity.find({
                username: username
            }, (err, docs) => {
                return res.status(200).json(docs);
            });
        }
    });
});

activitiesRouter.post('/', (req, res) => {
    let username = req.body.username;
    let startTime = req.body.startTime;
    let endTime = req.body.endTime;
    let activity = req.body.activity;
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('startTime', 'Start Time is required').notEmpty();
    req.checkBody('endTime', 'End Time is required').notEmpty();
    req.checkBody('activity', 'Activity name is required').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        return res.status(422).json({ errors: errors });
    }

    User.findOne({
        username: username
    }, (err, doc) => {
        if (doc === null){
            return res.status(401).json({
                error: 'User does not exist'
            });
        }
        else {
            //pending: find the duration, and check if it overlaps
            let activity = new Activity(req.body);
            activity.save().then(doc => {
                if(!doc || doc.length == 0){
                    return res.status(500).send(doc);
                }
                return res.status(201).send(d0c);
            }).catch(err => {
                res.status(500).json(err);
            });
        }
    });
});

activitiesRouter.delete('/:id', (req, res) => {
    if (!req.params.id){
        return res.status(422).json({
            error: 'Activity ID is required'
        });
    }
    Activity.findByIdAndDelete({
        _id: id
    }, (req, res) => {
        return res.status(200).json({
            msg: 'Activity deleted'
        });
    });
});

module.exports = activitiesRouter;
