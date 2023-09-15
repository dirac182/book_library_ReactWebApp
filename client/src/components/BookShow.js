import {useState} from "react";
import BookEdit from "./BookEdit.js";

import useBookContext from "../hooks/use-books-context.js";

function BookShow ({book}) {
    const [showEdit,setShowEdit] = useState(false);

    const {deleteBookById} = useBookContext();

    const handleDeleteClick = () => {
        deleteBookById(book._id);
    }
    const handleEditClick = () => {
        setShowEdit(!showEdit)
    }

    const handleSubmit = () => {
        setShowEdit(false);
    }

    let content = <h3>{book.title}</h3>
    if (showEdit) {
        content = <BookEdit book={book} onSubmit={handleSubmit} />
    }

    return (
    <div className="book-show">
        <img alt="books" src= {`https://picsum.photos/seed/${book._id}/300/200`} />
        <div>{content}</div>
            <div className="actions">
                <button className="edit" onClick={handleEditClick}>
                    Edit
                </button>
                <button className="delete" onClick={handleDeleteClick}>
                    Delete
                </button>
            </div>
        </div>
    )
}

export default BookShow;