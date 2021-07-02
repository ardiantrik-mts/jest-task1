const Transaction = require('../models/transaction')
const Wallet = require ('../models/wallet')

//routes
const getWalletAll = async (req,res)=>{
    try{
        let allWallet= await getAll()
        res.status(200).json(allWallet)
    }catch(err){
        res.status(401).json({'message' : 'faied' , 'error' : err.message})
    }
}

const getWalletById = async (req,res)=>{
    try{
        let walletUser=await getById(req.param.id)
        if(walletUser!=null){
            res.status(200).json(walletUser)
        }else{

        }
    }catch(err){
        res.status(401).json({'message' : 'faied' , 'error' : err.message})
    }
}

const updateWallet = async (req, res) => {
    try{
        let newTransaction= new Transaction(req.body)
        let updatedWallet= await update(newTransaction)
        res.status(201).json(updatedWallet)
    }catch(error){
        return res.status(400).json({ message: err.message })
    }
  }

//internal function
async function create(user){
    let newWallet= new Wallet({user : user._id})
    return newWallet.save()
}

async function update(transaction){
    try{
        const wallet = await Wallet.findOne(transaction.user)

        if  (transaction.flag===1){
            if( transaction.transactionType==='S' || transaction.transactionType === 'GS' || transaction.transactionType === 'BS' ){

            }
            if( transaction.transactionType==='BE' ){

            }
        }else 
        if  (transaction.flag===0){
            if( transaction.transactionType==='S' || transaction.transactionType === 'GS' || transaction.transactionType === 'BS' ){

            }
            if( transaction.transactionType==='BE' ){

            }
        }else{

        }

        return wallet.save()

    }catch(err){

    }
}

async function getAll(){
    try{
        return Wallet.find().populate('user')
    }catch(err){
        return err
    }
}

async function getById(id){
    try{
        return Wallet.findOne(id)
    }catch(err){
        return err
    }
}

module.exports={
    //module
    getWalletAll,getWalletById,updateWallet,
    //function
    create,getAll,getById,update
}