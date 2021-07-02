const User = require('../models/user')
const WalletModels = require('../models/wallet')
const TransactionModels = require('../models/transaction')
const response = require('../helpers/response')
const Wallet = require('../controllers/wallet')
const cron = require('node-cron');

const createUser = async (req, res) => {
    let user = new User(req.body)
    try {
        let newUser = await create(user)
        res.status(201).json(newUser)
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}

// Updating One
const updateUser = async (req, res) => {
    try {
        if (role === 1) {
            let updatedUser = await update(req.params.id, req.body)
            res.status(201).json(updatedUser)
        } else {
            res.status(400).json({
                'message': 'Sorry,you dont have authorization to access this'
            })
        }
    } catch (error) {
        return res.status(400).json({
            message: err.message
        })
    }
}

// comment this section if you want to run unit test
const getAllUser = (req, res) => {
    let {
        role
    } = req.userData
    if (role === 2 || role === 3) {
        User.find({}).then((data) => {
            res.status(200).json({
                'message': 'list all user',
                'data': data
            })
        })
    } else {
        res.status(400).json({
            'message': 'Sorry,you dont have authorization to access this'
        })
    }
}

const getAllUserWithCondition = (req, res) => {
    let {
        username
    } = req.userData
    User.find({
            username: {
                $ne: username
            }
        }).then((data) => {
            return response(res, 200, true, 'list all user', data)
        })
        .catch(err => {
            return response(res, 400, false, err)
        })
}

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(400).send()
        }
        res.status(200).send(user)
    } catch (err) {
        res.status(500).send(err.message)
    }
}
// comment until this section


const getUserBirthday = (req, res) => {
    const {
        date
    } = req.query
    let today = new Date();
    let todayString = today.toISOString().split('T')[0];
    let twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    let twoDaysAgoString = twoDaysAgo.toISOString().split('T')[0];
    let dateInterval = {
        $gte: twoDaysAgoString,
        $lte: todayString
    }
    let searchDate = date ? date : dateInterval;
    User.find({
            dateOfBirth: searchDate
        }).then((data) => {
            return response(res, 200, true, 'Birthday user', data)
        })
        .catch(err => {
            return response(res, 400, false, err)
        })
}

const activateBirthdayScheduler = (req, res) => {
    console.log("cron start, check and giving present to anyone who's birthday everyday at 00:00");
    try {
        let today = new Date()
        let todayString = today.toISOString().split('T')[0];
        cron.schedule('0 0 * * *', () => {
            User.find({
                    dateOfBirth: todayString
                })
                .then((data) => {
                    const _ids = data.map(birthday => birthday._id);
                    console.log(`list birthday user ${_ids}`);
                    _ids.forEach((_id) => {
                        let transactionHistory1 = new TransactionModels({
                            transactionType: 'S',
                            user: '60dbf1a87a948230d43cbac9',
                            user2: _id,
                            flag: 1,
                            carrotAmount: 10,
                            transactionNote: 'Happy Birthday, 10 carrots for you'
                        })
                        let transactionHistory2 = new TransactionModels({
                            transactionType: 'S',
                            user: _id,
                            user2: '60dbf1a87a948230d43cbac9',
                            flag: 0,
                            carrotAmount: 10,
                            transactionNote: 'Happy Birthday, 10 carrots for you'
                        })
                        WalletModels.findOne({
                                user: _id
                            }).then((data) => {
                                transactionHistory1.save()
                                transactionHistory2.save()
                                    .then(transaction => {
                                        console.log(`Transaction to ${user} success`);
                                    })
                                    .catch(err => {
                                        console.log(err);
                                    })
                            })
                            .catch(err => {
                                console.log(err);
                            })
                    });
                    console.log(data);
                })
                .catch(err => {
                    console.log(err);
                })
        }, {
            scheduled: true,
            timezone: "Asia/Jakarta",
        })
        return response(res, 200, true, 'Birthday scheduler is active')
    } catch (error) {
        return response(res, 500, false, 'server error')
    }
}

//internal function
async function create(user) {
    return user.save().then(Wallet.create(user))
}

async function update(id, body) {
    const user = await User.findById(id)

    if (body.email != null) {
        user.email = body.email
    }
    if (body.name != null) {
        user.name = body.name
    }
    if (body.jobFamily != null) {
        user.jobFamily = body.jobFamily
    }
    if (body.grade != null) {
        user.grade = body.grade
    }
    if (body.dateOfBirth != null) {
        user.dateOfBirth = body.dateOfBirth
    }
    if (body.role_id != null) {
        user.role_id = body.role_id
    }

    return user.save()
}


// uncomment this section if you want to run unit test
// const getAllUser = (req, res) => {
//     let role = 2
//     if (role === 2 || role === 3) {
//         User.find({}).then((data) => {
//             res.status(200).json({
//                 'message': 'list all user',
//                 'data': data
//             })
//         })
//     } else {
//         res.status(400).json({
//             'message': 'Sorry,you dont have authorization to access this'
//         })
//     }
// }

// const getAllUserWithCondition = (req, res) => {
//     let siapa = "rabudiman";
//     User.find({
//             username: {
//                 $ne: siapa
//             }
//         }).then((data) => {
//             return response(res, 200, true, 'list all user', data)
//         })
//         .catch(err => {
//             return response(res, 400, false, err)
//         })
// }

// const getUserById = async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id)
//         if (!user) {
//             return res.status(400).send()
//         }
//         res.status(200).send(user)
//     } catch (err) {
//         res.status(500).send(err.message)
//     }
// }
// uncomment until this section

module.exports = {
    //module
    createUser,
    updateUser,
    getAllUser,
    getUserById,
    getAllUserWithCondition,
    getUserBirthday,
    activateBirthdayScheduler,
    //function
    create,
    update
}