import express from "express";
import mongoose from "mongoose";

const app = express();
const port = 3001;

// DatabaseStuff
mongoose.connect("mongodb+srv://admin-bus:admin-pass@cluster0.tlilvc7.mongodb.net/booksDB");
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

function getBooks() {
    Book.find()
        .then((bookList) => {
            if(bookList.length === 0){
                addDefaultBook();
            }
            return bookList     
        })
        .catch((error) => {
            console.log("Error pulling book list: " + error);
        })
    }




app.listen(port, () =>{
    console.log(`Api server has successfully started on port ${port}.`)
})

export default getBooks;