const express =require("express");
const {users} = require ("../data/user.json")

const router= express.Router();


/**
 * route: /user
 * method: GET
 * des:get all the list of users
 * parameters:none
*/

router.get("/",(req,res)=>{
    res.status(200).json({
        success:true,
        data:users
    })
})

/**
 * route: /user/:id
 * method: GET
 * des:get  users by id
 * parameters:id
*/

router.get('/:id',(req,res)=>{

    const {id}= req.params;
    const user = users.find((each)=>each.id ===  id)

    if(!user){
        return res.status(404).json({
            success:false,
            message:`User not found for ID ${id}`
        })
    }

    res.status(200).json({
        success:true,
        data:user
    })
})

/**
 * route: /user
 * method: POST
 * des:create a users 
 * parameters:none
*/

router.post('/',(req,res)=>{

    const {id, name, surname, email, subscriptionType, subscriptionDate}=req.body;

    if(!id || !name|| !surname|| !email|| !subscriptionType|| !subscriptionDate){
        return res.status(400).json({
            success:false,
            message:"Please provide all the required fields"
        })
    }

    const user = users.find((each)=>each.id===id)
    if(user){
        return res.status(409).json({
            success:false,
            message:"User already Exists"
        })
    }

    users.push({
        id,
        name,
        surname,
        email,
        subscriptionType,
        subscriptionDate 
    })

    res.status(201).json({
        success:true,
        message:"User Created Successfully!"
    })
})

/**
 * route: /user/:id
 * method: PUT
 * des:updating a users by id
 * parameters:id
*/

router.put('/:id',(req,res)=>{
    const {id}= req.params;
    const {data}= req.body;

    const user = users.find((each)=>each.id===id)
    if(!user){
        return res.status(404).json({
            success:false,
            message:"User not found"
        })
    }
    const updatedUser= users.map((each)=>{
        if(each.id === id){
            return{
                ...each,
                ...data,
            }
        }
        return each
    })
    res.status(200).json({
        success:true,
        data:updatedUser,
        message:"User updated !!"  
    })
})

/**
 * route: /user/:id
 * method: DELETE
 * des:deleting a users by id
 * parameters:id
*/
router.delete('/:id',(req,res)=>{
    const {id} = req.params;

    const user = users.find((each)=>each.id === id)
    if(!user){
        return res.status(404).json({
            success:false,
            message:"User not found"
        })
    }


    const updatedUser= users.filter((each)=>each.id !== id)

    res.status(200).json({
        success:true,
        data:updatedUser,
        message:"User Deleted !!"
    })
})

module.exports= router;
