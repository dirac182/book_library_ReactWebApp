import { createContext, useState } from "react";
import axios from "axios";

const BooksContext = createContext();

function Provider({children}) {
    const [books,setBooks] = useState([]);

    const fetchBooks = async () => {
        const response = await axios.get("http://localhost:5000/api");
        setBooks(response.data);
    }

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

    const valueToShare = {
        books,
        deleteBookById,
        editBookById,
        fetchBooks,
        createBook
    };

    return <BooksContext.Provider value={valueToShare}>
        {children}
    </BooksContext.Provider>
}


export {Provider};
export default BooksContext;