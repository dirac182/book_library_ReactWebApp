import { useContext } from "react";
import BooksContext from "../context/books.js";

function useBookContext() {
    return useContext(BooksContext);
}

export default useBookContext;