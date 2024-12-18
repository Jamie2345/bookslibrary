const express = require("express");
const { MongoClient, ObjectId } = require("mongodb"); // MongoDB driver

const app = express();
const port = 3000;

require("dotenv").config();

const fs = require("fs");
const path = require("path");
const booksDirectory = path.join(__dirname, 'books');
console.log(booksDirectory);

app.get("/api/books", async (req, res) => {
  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Connected to MongoDB");

    // Access the database and collection
    const database = client.db("BooksDatabase");
    const booksCollection = database.collection("books");

    // Find matching documents
    const books = await booksCollection.find().toArray();

    res.json({
      all_books: books,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error searching the database");
  } finally {
    // Close the database connection
    await client.close();
  }
});

app.get("/api/search", async (req, res) => {
  const query = req.query.q;
  if (!query) {
    res.status(400).send("Missing search query");
    return;
  }
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Connected to MongoDB");

    // Access the database and collection
    const database = client.db("BooksDatabase");
    const booksCollection = database.collection("books");

    const searchResults = await booksCollection
      .aggregate([
        {
          $search: {
            index: "booknamesearch",
            text: {
              query: query,
              path: { wildcard: "*" },
            },
          },
        },
        { $limit: 4 }, // Limit to 4 results
      ])
      .toArray();

    return res.status(200).json(searchResults);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error searching the database");
  } finally {
    // Close the database connection
    await client.close();
  }
});

app.get("/api/book/:id", async (req, res) => {
  const bookId = req.params.id;
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Connected to MongoDB");

    // Access the database and collection
    const database = client.db("BooksDatabase");
    const booksCollection = database.collection("books");

    // Find the book by ID
    const book = await booksCollection.findOne({ _id: new ObjectId(bookId) });

    if (!book) {
      res.status(404).send("Book not found");
      return;
    }

    res.json(book);
  } catch (error) {
    console.error(error);
    if (error.name === "BSONError") {
      res.status(400).send("Invalid book ID format");
      return;
    } else {
      res.status(500).send("Error retrieving the book");
    }
  } finally {
    // Close the database connection
    await client.close();
  }
});

app.get("/api/randombook", async (req, res) => {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Connected to MongoDB");

    // Access the database and collection
    const database = client.db("BooksDatabase");
    const booksCollection = database.collection("books");

    const books = await booksCollection.find().toArray();

    function getRndInteger(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    const randomIndex = getRndInteger(0, books.length - 1);
    const randomBook = books[randomIndex];

    return res.status(200).json(randomBook);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error searching the database");
  } finally {
    // Close the database connection
    await client.close();
  }
});

app.use('/books', express.static(booksDirectory));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
