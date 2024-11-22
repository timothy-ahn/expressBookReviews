const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password)
    return res.status(400).json({message: "Username and Password must be provided"});

  if (!isValid(username))
    return res.status(400).json({message: "User already exists"});

  users.push({"username": username, "password": password});

  return res.status(200).json({message: "User registred"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return res.status(200).json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];
  if (!book)
    return res.status(404).json({message: "Book not found"});

  return res.status(200).json(book);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
    const author_books = [];
    for (const isbn of Object.keys(books)) {
        const book = books[isbn];
        if (book.author === author)
            author_books.push(book);
    }
    return res.status(200).json(author_books);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    const title_books = [];
    for (const isbn of Object.keys(books)) {
        const book = books[isbn];
        if (book.title === title)
            title_books.push(book);
    }
    return res.status(200).json(title_books);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    const book = books[isbn];
    if (!book)
      return res.status(404).json({message: "Book not found"});
  
    return res.status(200).json(book.reviews);
});

module.exports.general = public_users;
