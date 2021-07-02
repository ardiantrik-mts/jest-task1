const Group = require('../models/staffGroup')
const response = require('../helpers/response')
const User = require('../models/user')
// Create Group
module.exports.group_post= async (req, res) => {
    const group = new Group(req.body)
    try {
        await User.updateMany({ '_id': group.managername }, { $addToSet: { groups: group._id } }, { new: true, useFindAndModify: false });
        await group.save()
        return response(res, 201, true, 'Data Inserted',group)
    } catch (err) {
        return response(res, 400, true, err)
    }
}


// Add Membership to Group
module.exports.addmember_post= async (req, res, next) => {
    try {
        const {groupId } = req.params;
        const userid = req.body

        const newGroup = await Group.findByIdAndUpdate(
            groupId,
            { $addToSet: { members: userid.members} },
            { new: true, useFindAndModify: false },
        )
    
         await User.updateMany({ '_id': newGroup.members }, { $addToSet: { groups: newGroup._id } }, { new: true, useFindAndModify: false });
        //  await User.updateMany({'_id': newGroup.managername}, { $addToSet: { groups: newGroup._id } }, { new: true, useFindAndModify: false })
        return response(res, 201, true, 'Data Inserted',newGroup)
        
    } catch (err) {
        next(err);
    }

}



module.exports.deleteUserFromGroup = async (req, res, next) => {
    const groupId = req.params.groupId;
    const userId = req.params.userId

    const userinGroup = await Group.updateMany(
        {_id:  groupId}, { $pull: { members: req.params.userId } }
    )
    console.log(userinGroup)

    await User.updateMany({ '_id': req.params.userId }, { $pullAll: { groups: [req.params.groupId] } });
    console.log(userinGroup)
    res.send(userinGroup)
}

// Get  Group All
module.exports.group_get = async (req, res) => {
    try {
        const group = await Group.find({}).populate("managername", {name: 1})
        if(!group){
            return res.status(400).send()
        }
            res.status(200).send(group)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

// Get Group by ID
module.exports.group_getId = async (req, res) => {
    try {
        const group = await Group.findById(req.params.id)
        if(!group){
            return res.status(400).send()
        }
            res.status(200).send(group)
    } catch (err) {
        res.status(500).send(err.message)
    }
}


// Delete
module.exports.group_delete = async (req, res) => {
    // const _id = req.params.id
    try{
        const group = await Group.findByIdAndDelete(req.params.id)
        // const user = await Group.findOne({_id : _id})
        // console.log(user)
        // console.log(user.members[2])
        // for(var i = 0; i < user.members.length;i++){
        //     console.log(user.members[i])
        // }
        // console.log("Helloo")
        // console.log(user)
        // await User.updateMany({'groups'})
        if(!group)
            return res.status(404).send()
        res.status(200).send(group)
    }catch(e){
        res.status(500).send(e.message)
    }
}

// Fatch
module.exports.group_patch = async (req, res) => {
    try{
        const _id = req.params.id
        // console.log(_id)
        const groupStaff = req.body
        // console.log(managerBody)
        const newmanager = groupStaff.managername 
        // console.log("New Manger " +  newmanager)
      
        const oldGroup = await Group.findOne({_id})
        // console.log("Old Group " + oldGroup)

        const oldManager = oldGroup.managername
        // console.log("Old Manager " + oldManager)


        // console.log(Object.assign(oldGroup, groupStaff))

        const newGroup = await oldGroup.save()


        await User.updateMany({ '_id': newmanager }, { $addToSet: { groups: newGroup._id } }, { new: true, useFindAndModify: false });
        await User.updateMany({ '_id': oldManager }, { $pull: { groups: newGroup._id } });



        
        if(!newGroup)
        return res.status(404).send()
        res.status(200).send(newGroup)
    }catch(e){
        res.status(500).send(e.message)
    }
}
