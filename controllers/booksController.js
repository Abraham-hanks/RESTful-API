function booksController(Book){
    function postBook(req, res) {
        if (!req.body.title) {
            res.status(400);
            return res.send('Title is required')
        }
        const book = new Book(req.body);
        book.save();
        res.status(201);
        return res.json(book);
    }

    function getBook (req, res) {
        const query = {};
        if (req.query.genre) {
            query.genre = req.query.genre;
        }
        Book.find(query, (err, books) => {
            if (err) {
                return res.send(err);
            }
            const returnBooks = books.map((book) => {
                let newBook = book.toJSON();
                newBook.links = {};
                newBook.links.self = `http://${req.headers.host}/dev.api/v1/books/${book._id}`
                return newBook;
            })
            return res.json(returnBooks);
        })
    }

    function findBook (req, res, next) {
        Book.findById(req.params.bookId, (err, book) => {
          if (err) {
            return res.send(err);
          }
          if (book) {
            req.book = book;
            return next();
          }
          return res.sendStatus(404);
        });
    }

    function getBookById (){}

    return { postBook, getBook, findBook }
}

module.exports = booksController