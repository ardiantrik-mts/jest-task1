const response = require('../helpers/response')
const Wallet = require('../models/wallet')
const Transaction = require('../models/transaction')
const Item = require('../models/Item')
const User = require('../models/user')

// comment this section if you want to run unit test
const transactionUserToUser = (req, res) => {
    const {
        carrotAmount,
        transactionNote,
        user2,
    } = req.body
    const {
        _id
    } = req.userData
    let transactionHistory1 = new Transaction({
        transactionType: 'S',
        user: _id,
        user2: user2,
        flag: 1,
        carrotAmount: carrotAmount,
        transactionNote: transactionNote
    })
    let transactionHistory2 = new Transaction({
        transactionType: 'S',
        user: user2,
        user2: _id,
        flag: 0,
        carrotAmount: carrotAmount,
        transactionNote: transactionNote
    })
    
    Wallet.findOne({
            user: _id
        }).then((data) => {
            if (data.balance < carrotAmount) {
                return response(res, 400, false, 'transfer failed, insufficient balance')
            } else {
                transactionHistory1.save()
                transactionHistory2.save()
                    .then(transaction => {
                        return response(res, 200, true, 'Transaction success')
                    })
                    .catch(err => {
                        return response(res, 400, false, err)
                    })
            }
        })
        .catch(err => {
            return response(res, 400, false, err)
        })
}

const getUserHistory = (req, res) => {
    const {
        _id
    } = req.userData
    Transaction.find({
        user: _id
    }).then((data) => {
        return response(res, 200, true, 'User transaction history', data)
    })
    .catch(err => {
        return response(res, 400, false, err)
    })
}
// comment until this section

const transactionExchangeBazaar = async (req, res) => {
    // const {
    //     carrotAmount,
    //     transactionNote,
    //     username2,
    // } = req.body
    const {
        username
    } = req.userData

    try {

        const items = await Item.findOne({ _id: req.params.item_id })
        console.log(items.stock);
        if (items.stock < 1) {
            return response(res, 400, false, 'Item Out of Stock')
        }
        const user = await User.findOne({ username: username })
        let transactionBazaar = new Transaction({
            transactionType: "BE",
            username: user._id,
            carrotAmount: items.carrotRate,
            transactionNote: "Carrot Exchange : "+items.name,
            itemId: items._id
        })

        const wallets = await Wallet.findOne({ username: username })
        if (wallets.balance < items.carrotRate) {
            return response(res, 400, false, 'transfer failed, insufficient balance')
        }

        wallets.balance = wallets.balance-items.carrotRate;
        wallets.bazaar = wallets.bazaar+items.carrotRate;

        transactionBazaar.save()
        wallets.save()
        
        return response(res, 200, true, 'Exchange success')
        
    } catch (err) {
        return response(res, 400, false, err)
    }
}

const getUserHistoryBazaar = async (req, res) => {
    const {
        username
    } = req.userData
    try {
        const user = await User.findOne({ username: username })
        const transactionBazaar = await Transaction.find({ username: user._id, transactionType: "BE" }).populate('itemId').exec();
        return response(res, 200, true, 'Fetch success', transactionBazaar)
    } catch (err) {
        return response(res, 400, false, err)
    }
}

const getBazaarClaimed = async (req, res) => {
    try {
        const transactionBazaar = await Transaction.find({}).populate('username').populate('itemId').exec();
        return response(res, 200, true, 'Fetch success', transactionBazaar)
    } catch (err) {
        return response(res, 400, false, err)
    }
}


// uncomment this section if you want to run unit test
// const transactionUserToUser = (req, res) => {
//     const {
//         carrotAmount,
//         transactionNote,
//         user2,
//         _id,
//     } = req.body
//     let transactionHistory1 = new Transaction({
//         transactionType: 'S',
//         user: _id,
//         user2: user2,
//         flag: 1,
//         carrotAmount: carrotAmount,
//         transactionNote: transactionNote
//     })
//     let transactionHistory2 = new Transaction({
//         transactionType: 'S',
//         user: user2,
//         user2: _id,
//         flag: 0,
//         carrotAmount: carrotAmount,
//         transactionNote: transactionNote
//     })
    
//     Wallet.findOne({
//             user: _id
//         }).then((data) => {
//             if (data.balance < carrotAmount) {
//                 return response(res, 400, false, 'Transfer failed, insufficient balance')
//             } else {
//                 transactionHistory1.save()
//                 transactionHistory2.save()
//                     .then(transaction => {
//                         return response(res, 200, true, 'Transaction success')
//                     })
//                     .catch(err => {
//                         return response(res, 400, false, err)
//                     })
//             }
//         })
//         .catch(err => {
//             return response(res, 400, false, err)
//         })
// }

// const getUserHistory = (req, res) => {
//     const {
//         _id
//     } = req.body
//     Transaction.find({
//         user: _id
//     }).then((data) => {
//         return response(res, 200, true, 'User transaction history', data)
//     })
//     .catch(err => {
//         return response(res, 400, false, err)
//     })
// }
// uncomment until this section


module.exports = {
    transactionUserToUser,
    getUserHistory,
    transactionExchangeBazaar,
    getUserHistoryBazaar,
    getBazaarClaimed
}