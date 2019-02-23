const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const validator = require('express-validator');
const {mongoose} = require('./db');
const {User} = require('./models/user');
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(validator());



app.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();

    var errors = req.validationErrors();
    if (errors) {
        return res.status(422).json({ errors: errors });
    }
    else {
        User.findOne({
            username: username
        }, (err, doc) => {
            if (doc === null){
                return res.status(401).json({
                    error: 'Incorrect username and/or password'
                });
            }
            if (doc.password === password) {
                return res.status(200).json({msg: 'Success login'});
            }
            else {
                return res.status(401).json({
                    error: 'Incorrect username and/or password'
                });
            }
        });
    }
});










app.listen(port, () => console.log(`listening on ${PORT}`));
