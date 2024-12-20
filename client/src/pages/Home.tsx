import Navbar from "../components/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";

import { useSearch } from "../context/SearchContext";

export default function Home() {
  const [randomBooks, setRandomBooks] = useState<any[]>([]);
  const [businessBooks, setBusinessBooks] = useState<any[]>([]);
  const [personalDevelopmentBooks, setPersonalDevelopmentBooks] = useState<
    any[]
  >([]);
  const [philosophyBooks, setPhilosophyBooks] = useState<any[]>([]);
  const [historyBooks, setHistoryBooks] = useState<any[]>([]);
  const [fictionBooks, setFictionBooks] = useState<any[]>([]);

  const { searchResults, resetSearchResults } = useSearch();

  const handleResetSearchResults = () => {
    resetSearchResults();
  };

  useEffect(() => {
    axios.get("/api/books").then((res) => {
      if (res.status === 200) {
        console.log(res.data.all_books);
        processBooks(res.data.all_books);
      }
    });
  }, []);

  const processBooks = (books: Array<any>) => {
    setRandomBooks(pickRandomItems(books, 8));
    setBusinessBooks(
      pickRandomItems(
        books.filter((book) => book["Book Genre"].includes("Business")),
        4
      )
    );
    setPersonalDevelopmentBooks(
      pickRandomItems(
        books.filter((book) =>
          book["Book Genre"].includes("Personal Development")
        ),
        4
      )
    );
    setPhilosophyBooks(
      pickRandomItems(
        books.filter((book) => book["Book Genre"].includes("Philosophy")),
        4
      )
    );
    setHistoryBooks(
      pickRandomItems(
        books.filter((book) => book["Book Genre"].includes("History")),
        4
      )
    );
    setFictionBooks(
      pickRandomItems(
        books.filter((book) => book["Book Genre"].includes("Fiction")),
        4
      )
    );
  };

  const pickRandomItems = (items: Array<any>, count: number) => {
    const shuffled = [...items].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  return (
    <main className="flex w-full min-h-screen bg-base-200">
      <Navbar />
      <div className="flex w-full my-32 mx-20">
        <div className="w-full flex flex-col">
          {searchResults.length <= 0 ? (
            <>
              <div className="w-full flex flex-col">
                <h2 className="text-base-content text-xl font-semibold">
                  Random books
                </h2>
                <div className="w-full flex flex-wrap gap-4">
                  {randomBooks.map((book: any) => (
                    <div
                      key={book._id}
                      className="mt-4 w-full max-w-80 rounded-md shadow-md bg-base-100 flex flex-col justify-between border-[1px] border-primary p-4"
                    >
                      <a href={`/book/${book._id}`}>
                        <div className="flex items-center justify-center mb-8">
                          <img
                            src={`/books/${book["folder_path"]}/${book["thumbnail"]}`}
                            alt={book["Full Book Name"]}
                            className="max-h-72"
                          />
                        </div>
                      </a>
                      <div className="flex flex-col py-2">
                        <a href={`/book/${book._id}`}>
                          <h3 className="text-base-content text-md font-semibold">
                            {book["Full Book Name"]}
                          </h3>
                        </a>
                        <div className="w-full flex flex-wrap gap-2 mt-3">
                          {book["Book Genre"].map(
                            (genre: string, index: number) => (
                              <a href={`/search?genre=${genre}`} key={index}>
                                <span className="text-accent-content text-sm rounded-md shadow-sm py-1 px-2 bg-accent">
                                  {genre}
                                </span>
                              </a>
                            )
                          )}
                        </div>
                        <div className="w-full flex flex-wrap gap-2 mt-3">
                          <a href={`/search?author=${book["Author Name"]}`}>
                            <span className="text-base-content text-sm font-semibold">
                              {book["Author Name"]}
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full h-[1px] bg-base-content/30 my-12"></div>
              <div className="w-full flex flex-col">
                <h2 className="text-base-content text-xl font-semibold">
                  Business Books
                </h2>
                <div className="w-full flex flex-wrap gap-4">
                  {businessBooks.map((book: any) => (
                    <div
                      key={book._id}
                      className="mt-4 w-full max-w-80 rounded-md shadow-md bg-base-100 flex flex-col justify-between border-[1px] border-primary p-4"
                    >
                      <a href={`/book/${book._id}`}>
                        <div className="flex items-center justify-center mb-8">
                          <img
                            src={`/books/${book["folder_path"]}/${book["thumbnail"]}`}
                            alt={book["Full Book Name"]}
                            className="max-h-72"
                          />
                        </div>
                      </a>
                      <div className="flex flex-col py-2">
                        <a href={`/book/${book._id}`}>
                          <h3 className="text-base-content text-md font-semibold">
                            {book["Full Book Name"]}
                          </h3>
                        </a>
                        <div className="w-full flex flex-wrap gap-2 mt-4">
                          {book["Book Genre"].map(
                            (genre: string, index: number) => (
                              <a href={`/search?genre=${genre}`} key={index}>
                                <span className="text-accent-content text-sm rounded-md shadow-sm py-1 px-2 bg-accent">
                                  {genre}
                                </span>
                              </a>
                            )
                          )}
                        </div>
                        <div className="w-full flex flex-wrap gap-2 mt-3">
                          <a href={`/search?author=${book["Author Name"]}`}>
                            <span className="text-base-content text-sm font-semibold">
                              {book["Author Name"]}
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full h-[1px] bg-base-content/30 my-12"></div>
              <div className="w-full flex flex-col">
                <h2 className="text-base-content text-xl font-semibold">
                  Personal Development Books
                </h2>
                <div className="w-full flex flex-wrap gap-4">
                  {personalDevelopmentBooks.map((book: any) => (
                    <div
                      key={book._id}
                      className="mt-4 w-full max-w-80 rounded-md shadow-md bg-base-100 flex flex-col justify-between border-[1px] border-primary p-4"
                    >
                      <a href={`/book/${book._id}`}>
                        <div className="flex items-center justify-center mb-8">
                          <img
                            src={`/books/${book["folder_path"]}/${book["thumbnail"]}`}
                            alt={book["Full Book Name"]}
                            className="max-h-72"
                          />
                        </div>
                      </a>
                      <div className="flex flex-col py-2">
                        <a href={`/book/${book._id}`}>
                          <h3 className="text-base-content text-md font-semibold">
                            {book["Full Book Name"]}
                          </h3>
                        </a>
                        <div className="w-full flex flex-wrap gap-2 mt-4">
                          {book["Book Genre"].map(
                            (genre: string, index: number) => (
                              <a href={`/search?genre=${genre}`} key={index}>
                                <span className="text-accent-content text-sm rounded-md shadow-sm py-1 px-2 bg-accent">
                                  {genre}
                                </span>
                              </a>
                            )
                          )}
                        </div>
                        <div className="w-full flex flex-wrap gap-2 mt-3">
                          <a href={`/search?author=${book["Author Name"]}`}>
                            <span className="text-base-content text-sm font-semibold">
                              {book["Author Name"]}
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full h-[1px] bg-base-content/30 my-12"></div>
              <div className="w-full flex flex-col">
                <h2 className="text-base-content text-xl font-semibold">
                  Philosophy Books
                </h2>
                <div className="w-full flex flex-wrap gap-4">
                  {philosophyBooks.map((book: any) => (
                    <div
                      key={book._id}
                      className="mt-4 w-full max-w-80 rounded-md shadow-md bg-base-100 flex flex-col justify-between border-[1px] border-primary p-4"
                    >
                      <a href={`/book/${book._id}`}>
                        <div className="flex items-center justify-center mb-8">
                          <img
                            src={`/books/${book["folder_path"]}/${book["thumbnail"]}`}
                            alt={book["Full Book Name"]}
                            className="max-h-72"
                          />
                        </div>
                      </a>
                      <div className="flex flex-col py-2">
                        <a href={`/book/${book._id}`}>
                          <h3 className="text-base-content text-md font-semibold">
                            {book["Full Book Name"]}
                          </h3>
                        </a>
                        <div className="w-full flex flex-wrap gap-2 mt-4">
                          {book["Book Genre"].map(
                            (genre: string, index: number) => (
                              <a href={`/search?genre=${genre}`} key={index}>
                                <span className="text-accent-content text-sm rounded-md shadow-sm py-1 px-2 bg-accent">
                                  {genre}
                                </span>
                              </a>
                            )
                          )}
                        </div>
                        <div className="w-full flex flex-wrap gap-2 mt-3">
                          <a href={`/search?author=${book["Author Name"]}`}>
                            <span className="text-base-content text-sm font-semibold">
                              {book["Author Name"]}
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full h-[1px] bg-base-content/30 my-12"></div>
              <div className="w-full flex flex-col">
                <h2 className="text-base-content text-xl font-semibold">
                  History Books
                </h2>
                <div className="w-full flex flex-wrap gap-4">
                  {historyBooks.map((book: any) => (
                    <div
                      key={book._id}
                      className="mt-4 w-full max-w-80 rounded-md shadow-md bg-base-100 flex flex-col justify-between border-[1px] border-primary p-4"
                    >
                      <a href={`/book/${book._id}`}>
                        <div className="flex items-center justify-center mb-8">
                          <img
                            src={`/books/${book["folder_path"]}/${book["thumbnail"]}`}
                            alt={book["Full Book Name"]}
                            className="max-h-72"
                          />
                        </div>
                      </a>
                      <div className="flex flex-col py-2">
                        <a href={`/book/${book._id}`}>
                          <h3 className="text-base-content text-md font-semibold">
                            {book["Full Book Name"]}
                          </h3>
                        </a>
                        <div className="w-full flex flex-wrap gap-2 mt-4">
                          {book["Book Genre"].map(
                            (genre: string, index: number) => (
                              <a href={`/search?genre=${genre}`} key={index}>
                                <span className="text-accent-content text-sm rounded-md shadow-sm py-1 px-2 bg-accent">
                                  {genre}
                                </span>
                              </a>
                            )
                          )}
                        </div>
                        <div className="w-full flex flex-wrap gap-2 mt-3">
                          <a href={`/search?author=${book["Author Name"]}`}>
                            <span className="text-base-content text-sm font-semibold">
                              {book["Author Name"]}
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full h-[1px] bg-base-content/30 my-12"></div>
              <div className="w-full flex flex-col">
                <h2 className="text-base-content text-xl font-semibold">
                  Fiction Books
                </h2>
                <div className="w-full flex flex-wrap gap-4">
                  {fictionBooks.map((book: any) => (
                    <div
                      key={book._id}
                      className="mt-4 w-full max-w-80 rounded-md shadow-md bg-base-100 flex flex-col justify-between border-[1px] border-primary p-4"
                    >
                      <a href={`/book/${book._id}`}>
                        <div className="flex items-center justify-center mb-8">
                          <img
                            src={`/books/${book["folder_path"]}/${book["thumbnail"]}`}
                            alt={book["Full Book Name"]}
                            className="max-h-72"
                          />
                        </div>
                      </a>
                      <div className="flex flex-col py-2">
                        <a href={`/book/${book._id}`}>
                          <h3 className="text-base-content text-md font-semibold">
                            {book["Full Book Name"]}
                          </h3>
                        </a>
                        <div className="w-full flex flex-wrap gap-2 mt-4">
                          {book["Book Genre"].map(
                            (genre: string, index: number) => (
                              <a href={`/search?genre=${genre}`} key={index}>
                                <span className="text-accent-content text-sm rounded-md shadow-sm py-1 px-2 bg-accent">
                                  {genre}
                                </span>
                              </a>
                            )
                          )}
                        </div>
                        <div className="w-full flex flex-wrap gap-2 mt-3">
                          <a href={`/search?author=${book["Author Name"]}`}>
                            <span className="text-base-content text-sm font-semibold">
                              {book["Author Name"]}
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="w-full flex flex-col">
              <div className="flex items-center">
                <h2 className="text-base-content text-xl font-semibold mr-4">
                  Search Results
                </h2>
                <button
                  className="bg-primary text-primary-content shadow-md rounded-md p-[6px] text-sm font-semibold"
                  onClick={handleResetSearchResults}
                >
                  Clear
                </button>
              </div>
              <div className="w-full flex flex-wrap gap-4">
                {searchResults.map((book: any) => (
                  <div
                    key={book._id}
                    className="mt-4 w-full max-w-80 rounded-md shadow-md bg-base-100 flex flex-col justify-between border-[1px] border-primary p-4"
                  >
                    <a href={`/book/${book._id}`}>
                      <div className="flex items-center justify-center mb-8">
                        <img
                          src={`/books/${book["folder_path"]}/${book["thumbnail"]}`}
                          alt={book["Full Book Name"]}
                          className="max-h-72"
                        />
                      </div>
                    </a>
                    <div className="flex flex-col py-2">
                      <a href={`/book/${book._id}`}>
                        <h3 className="text-base-content text-md font-semibold">
                          {book["Full Book Name"]}
                        </h3>
                      </a>
                      <div className="w-full flex flex-wrap gap-2 mt-3">
                        {book["Book Genre"].map(
                          (genre: string, index: number) => (
                            <a href={`/search?genre=${genre}`}>
                              <span
                                key={index}
                                className="text-accent-content text-sm rounded-md shadow-sm py-1 px-2 bg-accent"
                              >
                                {genre}
                              </span>
                            </a>
                          )
                        )}
                      </div>
                      <div className="w-full flex flex-wrap gap-2 mt-3">
                        <a href={`/search?author=${book["Author Name"]}`}>
                          <span className="text-base-content text-sm font-semibold">
                            {book["Author Name"]}
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
