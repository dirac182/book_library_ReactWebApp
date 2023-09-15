import BookShow from "./BookShow.js";
import useBookContext from "../hooks/use-books-context.js";

function BookList () {
    const { books } = useBookContext();

    const renderedBooks = books.map((book,index) => {
        return <BookShow key={book._id} book={book} />
    }) 

    return <div className="book-list">
        {renderedBooks}
        </div>;
}

export default BookList;