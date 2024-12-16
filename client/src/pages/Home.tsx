import Navbar from "../components/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";

import { useSearch } from "../context/SearchContext";

export default function Home() {
  const [randomBooks, setRandomBooks] = useState([]);
  const [businessBooks, setBusinessBooks] = useState([]);
  const [personalDevelopmentBooks, setPersonalDevelopmentBooks] = useState([]);
  const [philosophyBooks, setPhilosophyBooks] = useState([]);
  const [historyBooks, setHistoryBooks] = useState([]);
  const [fictionBooks, setFictionBooks] = useState([]);

  const { searchResults, resetSearchResults } = useSearch();

  const handleResetSearchResults = () => {
    resetSearchResults();
  }

  useEffect(() => {
    axios.get("/api/books").then((res) => {
      if (res.status === 200) {
        setRandomBooks(res.data.random_books);
        setBusinessBooks(res.data.business_books);
        setPersonalDevelopmentBooks(res.data.personal_development_books);
        setPhilosophyBooks(res.data.philosophy_books);
        setHistoryBooks(res.data.history_books);
        setFictionBooks(res.data.fiction_books);

        console.log(res.data);
      }
    });
  }, []);

  return (
    <main data-theme="light" className="flex w-full min-h-screen bg-base-100">
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
                      className="mt-4 w-full max-w-96 rounded-md shadow-md bg-base-100 flex flex-col justify-between border-[1px] border-primary p-4"
                    >
                      <div></div>
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
              <div className="w-full h-[1px] bg-base-content/30 my-12"></div>
              <div className="w-full flex flex-col">
                <h2 className="text-base-content text-xl font-semibold">
                  Business Books
                </h2>
                <div className="w-full flex flex-wrap gap-4">
                  {businessBooks.map((book: any) => (
                    <div
                      key={book._id}
                      className="mt-4 w-full max-w-96 rounded-md shadow-md bg-base-100 flex flex-col justify-between border-[1px] border-primary p-4"
                    >
                      <div></div>
                      <div className="flex flex-col py-2">
                        <a href={`/book/${book._id}`}>
                          <h3 className="text-base-content text-md font-semibold">
                            {book["Full Book Name"]}
                          </h3>
                        </a>
                        <div className="w-full flex flex-wrap gap-2 mt-4">
                          {book["Book Genre"].map((genre: string) => (
                            <a href={`/search?genre=${genre}`}>
                              <span
                                key={genre}
                                className="text-accent-content text-sm rounded-md shadow-sm py-1 px-2 bg-accent"
                              >
                                {genre}
                              </span>
                            </a>
                          ))}
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
                      className="mt-4 w-full max-w-96 rounded-md shadow-md bg-base-100 flex flex-col justify-between border-[1px] border-primary p-4"
                    >
                      <div></div>
                      <div className="flex flex-col py-2">
                        <a href={`/book/${book._id}`}>
                          <h3 className="text-base-content text-md font-semibold">
                            {book["Full Book Name"]}
                          </h3>
                        </a>
                        <div className="w-full flex flex-wrap gap-2 mt-4">
                          {book["Book Genre"].map((genre: string) => (
                            <a href={`/search?genre=${genre}`}>
                              <span
                                key={genre}
                                className="text-accent-content text-sm rounded-md shadow-sm py-1 px-2 bg-accent"
                              >
                                {genre}
                              </span>
                            </a>
                          ))}
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
                      className="mt-4 w-full max-w-96 rounded-md shadow-md bg-base-100 flex flex-col justify-between border-[1px] border-primary p-4"
                    >
                      <div></div>
                      <div className="flex flex-col py-2">
                        <a href={`/book/${book._id}`}>
                          <h3 className="text-base-content text-md font-semibold">
                            {book["Full Book Name"]}
                          </h3>
                        </a>
                        <div className="w-full flex flex-wrap gap-2 mt-4">
                          {book["Book Genre"].map((genre: string) => (
                            <a href={`/search?genre=${genre}`}>
                              <span
                                key={genre}
                                className="text-accent-content text-sm rounded-md shadow-sm py-1 px-2 bg-accent"
                              >
                                {genre}
                              </span>
                            </a>
                          ))}
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
                      className="mt-4 w-full max-w-96 rounded-md shadow-md bg-base-100 flex flex-col justify-between border-[1px] border-primary p-4"
                    >
                      <div></div>
                      <div className="flex flex-col py-2">
                        <a href={`/book/${book._id}`}>
                          <h3 className="text-base-content text-md font-semibold">
                            {book["Full Book Name"]}
                          </h3>
                        </a>
                        <div className="w-full flex flex-wrap gap-2 mt-4">
                          {book["Book Genre"].map((genre: string) => (
                            <a href={`/search?genre=${genre}`}>
                              <span
                                key={genre}
                                className="text-accent-content text-sm rounded-md shadow-sm py-1 px-2 bg-accent"
                              >
                                {genre}
                              </span>
                            </a>
                          ))}
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
                      className="mt-4 w-full max-w-96 rounded-md shadow-md bg-base-100 flex flex-col justify-between border-[1px] border-primary p-4"
                    >
                      <div></div>
                      <div className="flex flex-col py-2">
                        <a href={`/book/${book._id}`}>
                          <h3 className="text-base-content text-md font-semibold">
                            {book["Full Book Name"]}
                          </h3>
                        </a>
                        <div className="w-full flex flex-wrap gap-2 mt-4">
                          {book["Book Genre"].map((genre: string) => (
                            <a href={`/search?genre=${genre}`}>
                              <span
                                key={genre}
                                className="text-accent-content text-sm rounded-md shadow-sm py-1 px-2 bg-accent"
                              >
                                {genre}
                              </span>
                            </a>
                          ))}
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
                <button className="bg-primary text-primary-content shadow-md rounded-md p-[6px] text-sm font-semibold" onClick={handleResetSearchResults}>Clear</button>
              </div>
              <div className="w-full flex flex-wrap gap-4">
                {searchResults.map((book: any) => (
                  <div
                    key={book._id}
                    className="mt-4 w-full max-w-96 rounded-md shadow-md bg-base-100 flex flex-col justify-between border-[1px] border-primary p-4"
                  >
                    <div></div>
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
