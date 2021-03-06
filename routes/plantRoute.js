const router = require("express").Router();
const Plant = require("../models/Plant");
const User = require("../models/User");
const ObjectId = require("mongoose").Types.ObjectId;
const arrayRemover = require("../utils/arrayremove")
const authenticate = require('../Middleware/authenticator')

//get all plants from database
router.get("/",async (req, res, next) => {
    try {
        const plant = await Plant.find().limit(25)
        res.status(200).json(plant)

    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

})

//search plant by familyName/ can add more search params  
// router.get('/plantname/:latinname', async (req, res) => {
//     const latinname = req.params.latinname;  // to get this from body or params
//     const result = await Plant.find({
//         latinName: new RegExp(latinname, 'i')
//     }, )
//     res.status(200).json(result)
// })
router.get("/:id",async (req, res, next) => {

    try {
        const plant = await Plant.findById(req.params.id)
        res.status(200).json(plant)

    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }

})

// push plant into user plants array
//adding plant into user plants collection 



//get all plants for one particular user (works)  
 // fetches user plants from dataase using userPlant array 
//  // this same method can be used to fetch user wish list from database

//  router.get("/dashboard/:user", async (req, res)=>{
//     const userid = req.params.id // to come from body or params
//     const user = await User.findById(userid).populate('userPlants')
//     res.status(200).json(user)
// })


//delete plant from user account (works)
//pulls the plant from the userPlanst array, can remove  several plants at the sametime need to pass as array
//removes plant from user plants cooolection 
router.put('/delete', async (req, res) => {
    const userId = req.body.userId
    const plantId = req.body.plantId
    // const userid = `61a663a146a4531698aedb60` // to get this from body or params
    // plantid = [`61a67737d90627d64e7eeb15`,'61a67737d90627d64e7eeb15']
    const userPlants = await User.updateOne({
        _id: userId
    }, {
        $pullAll: {
            userPlants: [plantId]
        }
    });
    res.status(200).json({
        message: "Plant has been deleted successfully", userPlants
    })
})



module.exports = router;