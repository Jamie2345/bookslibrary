const express = require("express");
const { MongoClient } = require("mongodb"); // MongoDB driver

const app = express();
const port = 3000;

require("dotenv").config();

function pickRandomItems(arr, count) {
  return arr.sort(() => Math.random() - 0.5).slice(0, count);
}

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
    const randomBooks = pickRandomItems(books, 8);

    const business_books = await booksCollection
      .find({ "Book Genre": { $in: ["Business"] } })
      .toArray();

    const randomBusinessBooks = pickRandomItems(business_books, 4);

    const philosophy_books = await booksCollection
      .find({ "Book Genre": { $in: ["Philosophy"] } })
      .toArray();
    const randomPhilosophyBooks = pickRandomItems(philosophy_books, 4);

    const personal_development_books = await booksCollection
      .find({ "Book Genre": { $in: ["Personal Development"] } })
      .toArray();
    const randomPersonalDevelopmentBooks = pickRandomItems(
      personal_development_books,
      4
    );

    const history_books = await booksCollection
      .find({ "Book Genre": { $in: ["History"] } })
      .toArray();
    const randomHistoryBooks = pickRandomItems(history_books, 4);

    const fiction_books = await booksCollection
      .find({ "Book Genre": { $in: ["Fiction"] } })
      .toArray();
    const randomFictionBooks = pickRandomItems(fiction_books, 4);

    // Send the results as JSON
    res.json({
      all_books: books,
      random_books: randomBooks,
      business_books: randomBusinessBooks,
      philosophy_books: randomPhilosophyBooks,
      personal_development_books: randomPersonalDevelopmentBooks,
      history_books: randomHistoryBooks,
      fiction_books: randomFictionBooks,
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
              path: { wildcard: "*" }
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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
