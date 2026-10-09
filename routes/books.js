const express = require("express");
const {books} = require("../data/books.json");

const {users} = require("../data/user.json")

const router = express.Router();

/**
 * route: /books
 * method: GET
 * des:get all the list of books
 * parameters:none
*/

router.get("/",(req,res)=>{
    res.status(200).json({
        success:true,
        data:books
    })
})


/**
 * route: /books/:id
 * method: GET
 * des:get  books by id
 * parameters:id
*/

router.get('/:id',(req,res)=>{

    const {id}= req.params;
    const book = books.find((each)=>each.id ===  id)

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
})

/**
 * route: /book
 * method: POST
 * des:create a new book 
 * parameters:none
*/

router.post('/',(req,res)=>{

    const {id, name, author, genre, price, publisher}=req.body;

    if(!id || !name|| !author|| !genre|| !price|| !publisher){
        return res.status(400).json({
            success:false,
            message:"Please provide all the required fields"
        })
    }

    const book = books.find((each)=>each.id === id)
        if(book){
            return res.status(409).json({
                success:false,
                message:"Book already exists"
            })
        }
    
   

    books.push({
        id,
        name,
        author,
        genre,
        price,
        publisher
    })

    res.status(201).json({
        success:true,
        message:"Book Created Successfully!",
        data:{id, name, author, genre, price, publisher}
    })
})


/**
 * route: /book?:id
 * method: PUT
 * des:update a book by id
 * parameters:id
*/



router.put('/:id',(req,res)=>{
    
    const {id}= req.params;
    const {data} = req.body;

    const book = books.find((each)=>each.id===id)
    if(!book){
        return res.status(404).json({
            success:false,
            message:"BOOK not found!"
        })
    }

    const updatedBook = books.map((each)=>{
        if(each.id === id){
            return{...each,...data};
        }
        return each;
    })

    res.status(200).json({
        success:true,
        data:updatedBook,
        message:"Book Updated!!"
    })
})


/**
 * route: /book/:id
 * method: DELETE
 * des:deleting a book by id
 * parameters:id
*/
router.delete('/:id',(req,res)=>{
    const {id} = req.params;

    const book = books.find((each)=>each.id === id)
    if(!book){
        return res.status(404).json({
            success:false,
            message:"BOOK not found"
        })
    }


    const updatedBook= books.filter((each)=>each.id !== id)

    res.status(200).json({
        success:true,
        data:updatedBook,
        message:"Book Deleted !!"
    })
})

/**
 * router:/books/issued/for-users
 * method: get
 * des: get all issued books
 * parameters:none
 */

router.get('/issued/for-users',(req,res)=>{
    const userWithIssuedBook = users.filter((each)=>{
        if(each.issuedBook){
            return each;
        }
    })

    const issuedBooks =[];

    userWithIssuedBook.forEach((each)=>{
        const book = books.find((book)=>book.id === each.issuedBook);

        book.issuedBy = each.name;
        book.issuedDate = each.issuedDate;
        book.returnDate = each.returnDate;

        issuedBooks.push(book)
    })

    if(!issuedBooks === 0){
        return res.status(404).json({
            success:false,
            message:"No book issued yet"
        })
    }

    res.status(200).json({
        success:true,
        data:issuedBooks
    })
})

module.exports=router;