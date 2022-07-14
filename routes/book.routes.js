const Book = require("../models/Book.model");
const Author = require("../models/Author.model");

const router = require("express").Router();


const checkIfLoggedIn = require("../middleware/checkIfLoggedIn");



// READ: List all books, first
router.get("/", (req, res, next) => {

  Book.find()
    .populate("author")
    .then((booksFromDB) => {
      console.log("Query to DB worked...", booksFromDB.length)

      const data = {
        booksArr: booksFromDB
      };

      res.render("books/books-list", data);
    })
    .catch((error) => {
      console.log("Error getting data from DB", error)
      next(error);
    })

});


// CREATE: Render form to create one book, third
// GET /books/create
router.get("/create", checkIfLoggedIn, (req, res, next) => {


  Author.find()
    .then(authorsArr => {
      res.render("books/book-create", { authorsArr });
    })
    .catch((error) => {
      console.log("Error getting authors from DB", error);
      next(error);
    })

})

router.post("/create", checkIfLoggedIn, (req, res, next) => {
  const bookDetails = {
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    rating: req.body.rating,
  };

  Book.create(bookDetails)
    .then(() => {
      res.redirect("/books");
    })
    .catch((error) => {
      console.log("Error creating book in the DB", error);
      next(error);
    })
})


// READ: Book details, second
router.get("/:bookId", checkIfLoggedIn, (req, res, next) => {
  const bookId = req.params.bookId;

  Book.findById(bookId)
    .populate('author')
    .then((bookDetails) => {
      res.render("books/book-details", bookDetails);
    })
    .catch((error) => {
      console.log("Error getting book details from DB", error);
      next(error);
    })

})

// UPDATE: Render form, forth

router.get("/:bookId/edit", checkIfLoggedIn, (req, res, next) => {
  //const bookId = req.params.bookId;
  const { bookId } = req.params;


  Book.findById(bookId)
    .then((bookDetails) => {
      res.render("books/book-edit", bookDetails);
    })
    .catch((error) => {
      console.log("Error getting book details from DB", error);
      next(error);
    })
});

// UPDATE: Process form
router.post("/:bookId/edit", checkIfLoggedIn, (req, res, next) => {

  const { bookId } = req.params;
  const { title, description, author, rating } = req.body;

  Book.findByIdAndUpdate(bookId, { title, description, author, rating })
    .then(() => {
      res.redirect("/books");
      //res.redirect(`/books/${bookId}`); // redirect to book details page
    })
    .catch((error) => {
      console.log("Error updating book in the DB", error);
      next(error);
    })
});

// DELETE: delete book, fifth
router.post("/:bookId/delete", checkIfLoggedIn, (req, res, next) => {
  const { bookId } = req.params;

  Book.findByIdAndRemove(bookId)
    .then(() => {
      res.redirect('/books');
    })
    .catch((error) => {
      console.log("Error deleting book from DB", error);
      next(error);
    })
})


module.exports = router;
