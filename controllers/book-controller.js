const {BookModel, UserModel} = require("../models");
const IssuedBook = require("../dtos/book-dto")


exports.getAllBooks = async (req,res)=>{
    const books = await BookModel.find()

    if (books.length ===0){
        return res.status.json({
            success: false,
            message:"No Books in the system"
        })
    }

    res.status(200).json({
        success:true,
        data:books
    })
}

exports. getSingleBook = async (req, res)=>{
    const {id} = req.params;
    const book = await BookModel.findById(id);

     if(!book){
        return res.status(404).json({
            success:false,
            message:`book not found for ID ${id}`
        })
    }

    res.status(200).json({
        success:true,
        data:book
    })
}

exports.getAllIssuedBooks = async(req,res)=>{
    const users = await UserModel.find({
        issuedBook : {$exists:true},
    }).populate("issuedBook")

    const issuedBooks = users.map((each)=>{
        return new IssuedBook(each);
    })

    if (issuedBooks.length ===0){
        return  res.status(404).json({
            success:false,
            message:"No Book Issued"
        })
    }
    res.status(200).json({
        success:true,
        data:issuedBooks
    })
}

exports.addBook = async(req,res)=>{
    const {data} =req.body;

    if(!data || Object.keys(data).length ===0){
        return res.status(400).json({
            success:false,
            message:"Please provide the data to add new book"
        })
    }
    await BookModel.create(data);
    res.status(201).json({
        success:true,
        message:"Book added!",
        data:data
    })
}

exports.updateBookById = async(req,res)=>{
    const {id} = req.params;
    const {data} = req.body;

    if(!data || Object.keys(data).length===0){
        return res.status(400).json({
            success:false,
            message:"Please provide the data to update"
        })
    }
    const updatedBook = await BookModel.findOneAndUpdate(
        {_id:id},
        data,
        {new: true}
    )
    if(!updatedBook){
        return res.status(404).json({
            success:false,
            message:"Book not found by thid id"
        })
    }
    res.status(200).json({
        success:true,
        message:"Book Updated successfully!",
        data:updatedBook
    })
}

exports.deleteBookById = async(req,res)=>{ 
    const {id} = req.params;

    const book = await BookModel.findById(id);
    if(!book){
        return res.status(404).json({
            success: false,
            message:"Book not find by id"
        })
    }
    await BookModel.findByIdAndDelete(id);
    res.status(200).json({
        success:true,
        message:"Book Deleted!"
    })
}


