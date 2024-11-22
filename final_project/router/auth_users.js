const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ 
  const filtred = users.filter(f => f.username === username);
  return !filtred.length > 0;
}

const authenticatedUser = (username,password)=>{ 
    const filtred = users.filter(f => f.username === username && f.password === password);
    return filtred.length > 0;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password)
      return res.status(400).json({message: "Username and Password must be provided"});
    
    if (!authenticatedUser(username, password))
      return res.status(400).json({message: "Invalid username and/or password"});
    
    let accessToken = jwt.sign({
        pasword: password,
        username: username
    }, 'access', { expiresIn: 60 * 60 });

    // Store access token and username in session
    req.session.authorization = {
        accessToken, username
    }
    return res.status(200).json({message: "User logged in"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const review = req.body.review;
  const user = req.user;

  const book = books[isbn];
  if (!book)
    return res.status(404).json("Book not found");

  book.reviews[user.username] = review;

  return res.status(200).json({message: "Review created"});
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const review = req.body.review;
    const user = req.user;
  
    const book = books[isbn];
    if (!book)
      return res.status(404).json("Book not found");
  
    book.reviews = Object.fromEntries(Object.entries(book.reviews).filter(([k,v]) => k != user.username));
  
    return res.status(200).json({message: "Review deleted"});
  });

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
