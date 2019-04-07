const express = require('express');
const logsRouter = express.Router();
const {User} = require('./../models/user');
const {Log} = require('./../models/log');


/*
Goals to be accomplished in this router:
1. Check if a user has completed logging all weeks up to the current week √
2. Fetch all weeks for a user where user has logged AND not logged 20 hours in a week, since the beginning √
3. Run a batch job at the end of every week, to update the latest week data in the database. Data might be already available, so check for existing data first
*/

logsRouter.get('/iscomplete/:username', (req, res) => {
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
            Log.find({
                username: username,
                loggedallhours: false
            }).then(docs => {
                if (docs.length){
                    return res.status(200).json({
                        msg: false,
                        incompleteweeks: docs
                    });
                }
                else {
                    res.status(200).json({
                        msg: true
                    });
                }
            }).catch(err => {
                return res.status(500).json({
                    error: err
                });
            });
        }
    });
});

logsRouter.get('/:username', (req, res) => {
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
            Log.find({
                username: username
            }).then(docs => {
                return res.status(200).json({
                    data: docs
                });
            }).catch(err => {
                return res.status(500).json({
                    error: err
                });
            });
        }
    });
});


module.exports = logsRouter;
