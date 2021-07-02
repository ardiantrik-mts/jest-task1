const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const response = require('../helpers/response')
const User = require('../models/user')
const userControl = require('../controllers/user')

const {
    APP_KEY
} = process.env

const register = (req, res) => {
    const { username, name, dateOfBirth, email, balance } = req.body
    User.countDocuments({ name: name, dateOfBirth: dateOfBirth, email: email }, function (err, count) {
        if (count > 0) {
            return response(res, 400, false, 'User is already registered in the system')
        } else {
            User.countDocuments({ username: username }, function (err, count) {
                if (count > 0) {
                    return response(res, 400, false, 'Username already used, please input another username')
                }
                let user = new User(req.body)
                bcrypt.hash(user.password, 10, function (err, encryptedPassword) {
                    if (err) {
                        return response(res, 400, false, `${err}`)
                    }
                    user.password = encryptedPassword
                    userControl.create(user)
                        .then(user => {
                            return response(res, 200, true, 'User added successfully')
                        })
                        .catch(err => {
                            return response(res, 400, false, err)
                        })
                })
            })
        }
    });
}

const login = (req, res) => {
    const {
        username,
        password
    } = req.body
    User.findOne({
            $or: [{
                username: username
            }]
        })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, function (err, result) {
                    if (err) {
                        return response(res, 400, false, `${err}`)
                    }
                    if (result) {
                        let token = jwt.sign({
                            username: user.username,
                            _id: user._id,
                            role: user.roleId
                        }, APP_KEY, {
                            expiresIn: '10h'
                        })
                        return response(res, 200, true, 'login success', token)

                    } else {
                        return response(res, 400, false, 'wrong password')
                    }
                })
            } else {
                return response(res, 400, false, 'no user found')
            }
        })
}

module.exports = {
    register,
    login
}