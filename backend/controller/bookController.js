const Book = require("../model/book");
// Create a new book

const createBook = async (req, res) => {
  try {
    const { title, author, subtitle, chapters } = req.body;

    // Validate required book fields
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    // Validate chapters array if provided
    if (chapters && chapters.length > 0) {
      for (let i = 0; i < chapters.length; i++) {
        if (!chapters[i].title) {
          return res.status(400).json({ message: `Chapter ${i + 1} title is required` });
        }
      }
    }

    const book = await Book.create({
      userId: req.user._id, // must match schema
      title,
      author,
      subtitle,
      chapters,
    });

    res.status(201).json({ message: "Book created successfully", book });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


// get all books for a user

const getBooks = async (req, res) => {
  try {
    const books = await Book.find({userId : req.user._id}).sort({createdAt : -1});
    res.status(200).json({books});

  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// get a single book by id

const getBookById = async (req, res) => {
  try {

    const book = await Book.findById(req.params.id);
    if(!book){
        return res.status(404).json({message : "Book not found"});
    }
    if(book.userId.toString() !== req.user._id.toString()){
        return res.status(401).json({message : "Not authorized to view this book"});
    }
    res.status(200).json({book});
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// update a book
const updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if(!book){
        return res.status(404).json({message : "Book not found"});
    }
    if(book.userId.toString() !== req.user._id.toString()){
        return res.status(401).json({message : "Not authorized to update this book"});
    }
    const updateBook = await Book.findByIdAndUpdate(req.params.id, req.body, {new : true});
    res.status(200).json({message : "Book updated successfully", book : updateBook});
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

/// delete a book

const deleteBook = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if(!book){
      return res.status(404).json({message : "Book not found"});
  }
  if(book.userId.toString() !== req.user._id.toString()){
      return res.status(401).json({message : "Not authorized to delete this book"});
  }
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json({message : "Book deleted successfully"});
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// update book cover
const updateBookCover = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "server Error", error: error.message });
  }
};

module.exports = {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  updateBookCover,
};
