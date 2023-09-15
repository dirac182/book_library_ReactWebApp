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

    const createBook = async (titleName) => {
        const response = await axios.post("http://localhost:5000/api/create", {title:titleName} );
        console.log(response.data);

        const updatedBooks = [...books,response.data];
        console.log(updatedBooks);

        setBooks(updatedBooks)
    } 

    const editBookById = async (idToEdit, newTitle) => {
        const response = await axios.post("http://localhost:5000/api/edit", {id: idToEdit, title:newTitle});
        console.log(response.data);

        const updatedBooks = books.map((book) =>{
            if (book._id === idToEdit) {
                return {...book, title:newTitle};
            }
            return book;
        });
        setBooks(updatedBooks);
    };

    const deleteBookById = async (idToDelete) => {
        const response = await axios.post("http://localhost:5000/api/delete", {id:idToDelete});
        console.log(response.data);

        const updatedBooks = books.filter((book) => {
            return book._id !== idToDelete
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