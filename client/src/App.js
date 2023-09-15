import {useEffect, useState} from "react";
import BookCreate from "./components/BookCreate.js";
import BookList from "./components/BookList.js";
import axios from "axios";

function App () {
    const [books,setBooks] = useState([]);

    const fetchBooks = async () => {
        const response = await axios.get("http://localhost:5000/api");
        setBooks(response.data);
    }

    useEffect(() => {
        fetchBooks();
    },[]);

    const createBook = async (title) => {
        const response = await axios.post("http://localhost:5000/api/create", {bookTitle: title});

        console.log(response);
        // setBooks(updatedBook)
    } 

    const editBookById = (idToEdit, newTitle) => {
        const updatedBooks = books.map((book) =>{
            if (book.id === idToEdit) {
                return {...book, title:newTitle};
            }
            return book;
        });
        setBooks(updatedBooks);
    };

    const deleteBookById = (idToDelete) => {
        const updatedBooks = books.filter((book) => {
            return book.id !== idToDelete
        })
        setBooks(updatedBooks);
    };

    return (
    <div className="app">
        <h1>Reading List</h1>
        <BookList books={books} onDelete={deleteBookById} onEdit={editBookById} />
        <BookCreate onCreate={createBook} />
    </div>
    )
}

export default App;