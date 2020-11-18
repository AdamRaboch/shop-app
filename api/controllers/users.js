const mongoose = require("mongoose");
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const createUser = (req, res, next) => {
    User.find({ email: req.body.email})
    .exec()
    .then(user => {
        // user is an array. If the array is empty then no similar email was found.
        if (user.length >= 1) {
            return res.status(500).json({
                message: "Unable to complete signup."
            })
        } else {
    bcrypt.hash(req.body.password, 10, (error, hash) => {
        if (error) {
            return res.status(500).json({
                error
            })
        } else {  
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        password: hash
    })
    user.save()
    .then(data => {
        console.log(data)
    res.status(201).json( {
            message: "User created."
        })
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({
            error
        })
    })
    }
    })
    }
    })
}
const loginUser = (req, res, next) => {
    User.find({ email: req.body.email})
    .exec()
    //  user is an array.  If there is a match for the email in the db, there will be one user in the array.
    .then(user => {
        if (user.length < 1)  {
            return res.status(401).json({
                message: "Login failed."
            })
        }
    bcrypt.compare(req.body.password, user[0].password, (error, login) => {
        if (error) {
            return res.status(401).json({
                message: "Login failed."
            })
        }
        if (login) {
            const token = jwt.sign({
                email: user[0].email,
                userId: user[0]._id
            }, 
            process.env.JWT_KEY, 
            {
                expiresIn: "4h"
            })
            return res.status(200).json({
                message: "Login successful.",
                token
            })
          }  else {
                return res.status(401).json({
                    message: "Login failed."
            }
    )
        }})
    }).catch(error => {
        console.log(error)
        res.status(500).json({
            error
        })
    })
}

const deleteUser = (req, res, next) => {
    User.remove({_id: req.params.userId})
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'User deleted'
          })
      })
    .catch(err => {
      console.log(error);
      res.status(500).json({
        error
      });
    });
}



module.exports = { createUser, loginUser, deleteUser }