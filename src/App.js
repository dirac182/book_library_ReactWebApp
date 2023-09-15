import {useState} from "react";
import BookCreate from "./components/BookCreate.js";
import BookList from "./components/BookList.js";


function App () {
    const [books,setBooks] = useState([]);


    const createBook = (title) => {
        const updatedBook = [
            ...books,
            {id: Math.round((Math.random()*9999)),
            title}
        ];
        setBooks(updatedBook)
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