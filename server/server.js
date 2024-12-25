const express = require("express");
const { MongoClient, ObjectId } = require("mongodb"); // MongoDB driver

const app = express();
const port = 3000;

require("dotenv").config();

const fs = require("fs");
const path = require("path");
const booksDirectory = "/BOOKS_PATH"; // Replace with the path to your books directory
console.log(booksDirectory);

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.get("/api/authors", async (req, res) => {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Connected to MongoDB");

    // Access the database and collection
    const database = client.db("BooksDatabase");
    const booksCollection = database.collection("books");

    const authors = await booksCollection.distinct("Author Name");

    return res.status(200).json(authors);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error searching the database");
  } finally {
    // Close the database connection
    await client.close();
  }
});

app.get("/api/genres", async (req, res) => {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Connected to MongoDB");

    // Access the database and collection
    const database = client.db("BooksDatabase");
    const booksCollection = database.collection("books");

    const genres = await booksCollection.distinct("Book Genre");

    return res.status(200).json(genres);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error searching the database");
  } finally {
    // Close the database connection
    await client.close();
  }
});

app.get("/api/titles", async (req, res) => {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Connected to MongoDB");

    // Access the database and collection
    const database = client.db("BooksDatabase");
    const booksCollection = database.collection("books");

    const bookTitles = await booksCollection.distinct("Full Book Name");

    return res.status(200).json(bookTitles);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error searching the database");
  } finally {
    // Close the database connection
    await client.close();
  }
});

app.post("/api/searchfilter/", async (req, res) => {
  const client = new MongoClient(process.env.MONGODB_URI);

  const {author, genres, title} = req.body;

  console.log(author);
  console.log(genres);

  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Connected to MongoDB");

    // Access the database and collection
    const database = client.db("BooksDatabase");
    const booksCollection = database.collection("books");

    const filter = {};

    if (title) {
      filter["Full Book Name"] = title;
    }

    if (author) {
      filter["Author Name"] = author;
    }

    if (genres && genres.length > 0) {
      filter["Book Genre"] = { $in: genres };
    }

    const books = await booksCollection.find(filter).toArray();

    return res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error searching the database");
  } finally {
    // Close the database connection
    await client.close();
  }
});

app.use("/books", express.static(booksDirectory));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
