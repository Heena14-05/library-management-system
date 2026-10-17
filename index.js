const express = require("express")

const dotenv = require("dotenv");

const DbConnection = require('./databaseConnection')

// importing routers
const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books");

dotenv.config();
6
const app = express();

DbConnection();

const PORT = 8081;

app.use(express.json());

app.get("/",(req, res)=>{
    res.status(200).json({
        message:"Home page"
    })
})

app.use("/users",usersRouter);
app.use("/books",booksRouter);



app.listen(PORT,()=>{
    console.log(`Server is up on http://localhost:${PORT}`);
    
})