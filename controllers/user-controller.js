const {UserModel, BookModel} = require("../models");

exports.getAllUsers = async (req,res)=>{
    const users = await UserModel.find()

    if(!users || users.length===0){
        return res.status(404).json({
            success:false,
            message:"User not found"
        })
    }
    res.status(200).json({
        success:true,
        data:users
    })
}

exports.getSingleUserById = async (req,res)=>{
    const {id} = req.params;
    const user = await UserModel.findById(id);

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
}

exports.createUser = async(req,res)=>{
    const {data} = req.body;
     if(!data || Object.keys(data).length ===0){
        return res.status(400).json({
            success:false,
            message:"Please provide the data to add new user"
        })
    }
    await UserModel.create(data);
    const getAllUsers = await UserModel.find()

    res.status(201).json({
    success:true,
    message:"User added!",
    data:getAllUsers 
    })
}

exports.updateUserById = async(req,res)=>{
    const {id} = req.params;
    const {data} = req.body;

    if(!data || Object.key(data).length===0){
        return res.status(404).json({
            success:false,
            message:"Please provide the data to update the user"
        })
    }

    const user = await UserModel.findById(id);
    if(!user){
        return res.status(404).json({
            success:false,
            message:`User not found for ID ${id}`
        })
    }

    const updateUser = await UserModel.findByIdAndUpdate(id, data, {new:true});

    res.status(200).json({
        success:true,
        data:updateUser,
        message:"User Added!"
    })

}


exports.deleteUserById = async(req,res)=>{
     const {id} = req.params;
    
        const user = await UserModel.findById(id);
        if(!user){
            return res.status(404).json({
                success: false,
                message:"user not find by id"
            })
        }
        await UserModel.findByIdAndDelete(id);
        res.status(200).json({
            success:true,
            message:"User Deleted!"
        })
}
