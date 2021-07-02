const Harvest = require('../models/harvest')
const response = require('../helpers/response')
const Transaction = require('../models/transaction')
const Wallet = require('../models/wallet')

module.exports.create_harvest = async (req,res) => {

    const {year, harvest} = req.body
    const harvests = new Harvest({
        year: year,
        harvest: harvest,
        carrot_in_barn: harvest
    })

    const count = await  Harvest.countDocuments({ year: harvests.year})
    try {
        const years = new Date().getFullYear()
        if (count > 0){
            return response(res, 400, false, 'Cannot create harvest in the same year')
        }
        else if(harvests.year === years || harvests.year === years+1){
            const harvest =  await harvests.save()
            return response(res, 200, true, 'sukses broh', harvest)
        }   
        else{
            return response(res, 400, false, "Tahun yang dimasukan salah")
        }    
    } catch (err) {
        res.status(400).send(err.message)
    }

}

module.exports.show_harvest = async (req, res) => {
    try {
        const harvest = await Harvest.find({})
        if(!harvest){
            return res.status(400).send()
        }
        return response(res, 200, true, 'sukses broh', harvest)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

module.exports.addmore_harvest = async (req,res) => {
    try {
        const _id = req.params.id
        const newCountHarvest = req.body.harvest
        const harvestId = req.params.id
        const oldHarvest = await Harvest.findOne({_id})
        const oldCountHarvest = oldHarvest.harvest   
        const oldinBarn  = oldHarvest.carrot_in_barn
        const updateHarvest = oldCountHarvest + newCountHarvest
        const updateinBarn = oldinBarn + newCountHarvest
        const newHarvest = await Harvest.updateMany( {'_id': harvestId}, {'harvest': updateHarvest,'carrot_in_barn': updateinBarn } )   
        
        // const baru = await Harvest.findOne({_id})
        
        res.status(201).send(newHarvest)
    }
    catch (err){
        res.status(400).send(err.message)
    }
}

module.exports.transactionToUser = async (req, res) => {

    const {
        carrotAmount,
        transactionNote,
        user2,
    } = req.body
    const {
        user
    } = req.userData._id

    const _id = req.params.id

    
    const oldHarvest = await Harvest.findOne({_id})   
    const oldCountHarvest = oldHarvest.distributed_carrot
    const oldCarrotinBurn = oldHarvest.carrot_in_barn
    const newDistributeCarrot = oldCountHarvest + carrotAmount
    const newCarrotinBurn = oldCarrotinBurn - newDistributeCarrot
   

    const findWallet = await Wallet.findOne({user: user2})
    const getOldearned = findWallet.earned
    const getoldBalance = findWallet.earned

    const newEarned = getOldearned + carrotAmount

    const newBalance = getoldBalance + carrotAmount

    let transactionHistory1 = new Transaction({
        transactionType: "S",
        user: user,
        user2: user2,
        flag: 1,
        carrotAmount: carrotAmount,
        transactionNote: transactionNote
    })
    let transactionHistory2 = new Transaction({
        transactionType: "S",
        user: user2,
        user2: user,
        flag: 0,
        carrotAmount: carrotAmount,
        transactionNote: transactionNote
    })

  await  Harvest.findOne({
        _id: _id
    }).then( async (data) => {
        if (data.carrot_in_barn < carrotAmount) {
            return response(res, 400, false, 'transfer failed, insufficient balance')
        } else {
            
            transactionHistory1.save()
            transactionHistory2.save()         
            await Harvest.updateMany( {'_id': _id}, {'distributed_carrot': newDistributeCarrot, 'carrot_in_barn': newCarrotinBurn  } ).then(
            await Wallet.updateMany({'user': user2}, {'earned': newEarned, 'balance': newBalance })
            )  
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

module.exports.showTransactionHarvest  = async (req,res) => {
    try {
        const transaction = await Transaction.find({"transactionType": "S", "flag": 1})
        if(!transaction){
            return res.status(400).send()
        }
        return response(res, 200, true, 'Sukses', transaction)
    } catch (err) {
        return response(res, 400, false, 'Transaction Not Found')
    }
    
}