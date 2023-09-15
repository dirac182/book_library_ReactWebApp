import {useEffect, useContext} from "react";
import BookCreate from "./components/BookCreate.js";
import BookList from "./components/BookList.js";
import BooksContext from "./context/books.js";


function App () {
    const {fetchBooks} = useContext(BooksContext);

    useEffect(() => {
        fetchBooks();
    },[]);

    return (
    <div className="app">
        <h1>Reading List</h1>
        <BookList />
        <BookCreate />
    </div>
    )
}

export default App;