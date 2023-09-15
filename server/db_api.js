import express from "express";
import mongoose from "mongoose";
import 'dotenv/config';
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const port = 5000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// DatabaseStuff
mongoose.connect(process.env.DB_LINK);
const bookSchema = {
    title: String
};
const Book = mongoose.model("Book", bookSchema);
const defaultBookOne = new Book ({
    title: "Dune: Book 1"
});

function addDefaultBook() {
    Book.create(defaultBookOne)
    .then((i) => {
        console.log("Added default book to DB.");
    })
    .catch((error) => {
        console.log("Error adding default book:" + error);
    })
}

app.get("/api", async (req,res) => {
    var books = []
    await Book.find({})
        .then((bookList) => {
            books = bookList;     
        })
        .catch((error) => {
            console.log("Error pulling book list: " + error);
        })
    res.json(books);
})

app.post("/api/create", async (req,res) => {
    console.log(req);
    res.json(req.body);
})


app.listen(port, () =>{
    console.log(`Api server has successfully started on port ${port}.`)
})