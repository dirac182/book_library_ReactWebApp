import express from "express";
import mongoose from "mongoose";
import 'dotenv/config';
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const port = 5000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

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
    const newBook = new Book({
        title: req.body.title,
    })
    Book.create(newBook)
    .then((i) => {
        console.log("Added new book book to DB.");
    })
    .catch((error) => {
        console.log("Error adding new book:" + error);
    })
    res.json(newBook);
})

app.post("/api/edit", async (req,res) => {
    console.log(req.body);
    const updatedBook = {
        title: req.body.title
    }
    Book.findOneAndReplace({_id: req.body.id},updatedBook)
  .then((result) => {
    console.log(updatedBook);
    res.json(updatedBook);
  })
  .catch((error) => {
    console.log("Error replacing" + error)
  })
})

app.post("/api/delete", async (req,res) => {
    Book.findByIdAndDelete({_id: req.body.id})
  .then((i) => {
    console.log("Successfully deleted post.");
  })
  .catch((error) => {
    console.log("Error deleting post:" + error);
  })
    res.json(req.body);
})

app.listen(port, () =>{
    console.log(`Api server has successfully started on port ${port}.`)
})