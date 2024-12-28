import NavbarNoSearch from "../components/NavbarNoSearch";
import Select from "react-select";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Search() {
  const [titles, setTitles] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);

  const [searchBookName, setSearchBookName] = useState("");
  const [searchAuthor, setSearchAuthor] = useState("");
  const [searchGenres, setSearchGenres] = useState([]);

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get("/api/authors");
        const data = response.data;
        setAuthors(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchGenres = async () => {
      try {
        const response = await axios.get("/api/genres");
        const data = response.data;
        setGenres(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchBookTitles = async () => {
      try {
        const response = await axios.get("/api/titles");
        const data = response.data;
        console.log(data);
        setTitles(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBookTitles();
    fetchAuthors();
    fetchGenres();
  }, []);

  const handleSearch = async () => {
    console.log(searchAuthor, searchGenres, searchBookName);

    try {
      const response = await axios.post("/api/searchfilter", {
        title: searchBookName,
        author: searchAuthor,
        genres: searchGenres,
      });
      const data = response.data;
      console.log(data);
      if (data.length <= 0) {
        console.log("No results found");
        alert("No results found");
        return;
      }
      setSearchResults(data); // if results found set the results.
    } catch (error) {
      console.error(error);
    }
  };

  //if (titles.length == 0 || authors.length == 0 || genres.length == 0) return;

  return (
    <main className="flex w-full min-h-screen bg-base-200">
      <NavbarNoSearch />
      <div className="flex w-full flex-col my-32 mx-12 lg:mx-24">
        {titles.length == 0 || authors.length == 0 || genres.length == 0 ? (
          <h2 className="text-base-content text-md">Loading...</h2>
        ) : (
          <>
            <h2 className="text-base-content text-xl font-semibold mb-4">
              Search
            </h2>
            <div className="w-full flex flex-col">
              <div className="w-full flex flex-col lg:flex-row lg:items-center">
                {titles && titles.length > 0 && (
                  <Select
                    options={titles.map((title) => ({
                      value: title,
                      label: title,
                    }))}
                    onChange={(selectedOption) => {
                      if (selectedOption?.value) {
                        setSearchBookName(selectedOption.value);
                      }
                      else {
                        setSearchBookName("");
                      }
                    }}
                    isClearable={true}
                    className="w-full mr-4 lg:max-w-[300px] mb-2 lg:mb-0"
                    placeholder="Select book title"
                    theme={(theme) => ({
                      ...theme,
                      colors: {
                        ...theme.colors,
                        //after select dropdown option
                        primary50: "oklch(var(--pc))",
                        //Border and Background dropdown color
                        primary: "oklch(var(--p) / 0.7)",
                        //Background hover dropdown color
                        primary25: "oklch(var(--b3))",
                        //Background color
                        neutral0: "oklch(var(--b1))",
                        //Border before select
                        neutral20: "oklch(var(--bc) / 0.3)",
                        //Hover border
                        neutral30: "oklch(var(--bc) / 0.5)",
                        //No options color
                        neutral40: "oklch(var(--bc / 0.6))",
                        //Select color
                        neutral50: "oklch(var(--bc) / 0.6)",
                        //arrow icon when click select
                        neutral60: "oklch(var(--bc) / 0.5)",
                        //Text color
                        neutral80: "oklch(var(--bc))",

                        neutral10: "oklch(var(--b2))",
                      },
                    })}
                  ></Select>
                )}
                {authors && authors.length > 0 && (
                  <Select
                    options={authors.map((author) => ({
                      value: author,
                      label: author,
                    }))}
                    onChange={(selectedOption) => {
                      if (selectedOption?.value) {
                        setSearchAuthor(selectedOption.value);
                      }
                      else {
                        setSearchAuthor("");
                      }
                    }}
                    isClearable={true}
                    className="w-full mr-4 lg:max-w-[300px] mb-2 lg:mb-0"
                    placeholder="Select author"
                    theme={(theme) => ({
                      ...theme,
                      colors: {
                        ...theme.colors,
                        //after select dropdown option
                        primary50: "oklch(var(--pc))",
                        //Border and Background dropdown color
                        primary: "oklch(var(--p) / 0.7)",
                        //Background hover dropdown color
                        primary25: "oklch(var(--b3))",
                        //Background color
                        neutral0: "oklch(var(--b1))",
                        //Border before select
                        neutral20: "oklch(var(--bc) / 0.3)",
                        //Hover border
                        neutral30: "oklch(var(--bc) / 0.5)",
                        //No options color
                        neutral40: "oklch(var(--bc / 0.6))",
                        //Select color
                        neutral50: "oklch(var(--bc) / 0.6)",
                        //arrow icon when click select
                        neutral60: "oklch(var(--bc) / 0.5)",
                        //Text color
                        neutral80: "oklch(var(--bc))",

                        neutral10: "oklch(var(--b2))",
                      },
                    })}
                  ></Select>
                )}
                {genres && genres.length > 0 && (
                  <Select
                    options={genres.map((genre) => ({
                      value: genre,
                      label: genre,
                    }))}
                    onChange={(selectedOptions) => {
                      if (selectedOptions) {
                        setSearchGenres(
                          selectedOptions.map((option) => option.value)
                        );
                      }
                      else {
                        setSearchGenres([]);
                      }
                    }}
                    isMulti={true}
                    isClearable={true}
                    className="w-full mr-4 mb-2 lg:mb-0"
                    placeholder="Select genre / genres"
                    theme={(theme) => ({
                      ...theme,
                      colors: {
                        ...theme.colors,
                        //after select dropdown option
                        primary50: "oklch(var(--pc))",
                        //Border and Background dropdown color
                        primary: "oklch(var(--p) / 0.7)",
                        //Background hover dropdown color
                        primary25: "oklch(var(--b3))",
                        //Background color
                        neutral0: "oklch(var(--b1))",
                        //Border before select
                        neutral20: "oklch(var(--bc) / 0.3)",
                        //Hover border
                        neutral30: "oklch(var(--bc) / 0.5)",
                        //No options color
                        neutral40: "oklch(var(--bc / 0.6))",
                        //Select color
                        neutral50: "oklch(var(--bc) / 0.6)",
                        //arrow icon when click select
                        neutral60: "oklch(var(--bc) / 0.5)",
                        //Text color
                        neutral80: "oklch(var(--bc))",

                        neutral10: "oklch(var(--b2))",
                      },
                    })}
                  ></Select>
                )}
                <button
                  className="bg-primary px-2 py-[7px] rounded-md shadow-sm text-primary-content font-semibold"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
              {searchResults && searchResults.length > 0 && (
                <div className="w-full flex flex-wrap gap-4 mt-4">
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
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
