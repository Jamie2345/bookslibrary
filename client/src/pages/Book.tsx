import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useSearch } from "../context/SearchContext";

export default function Book() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  const { searchResults, resetSearchResults } = useSearch();

  const handleResetSearchResults = () => {
    resetSearchResults();
  };

  useEffect(() => {
    const fetchBook = async () => {
      try {
        console.log(id);
        const response = await axios.get(`/api/book/${id}`);
        const data = response.data;
        console.log(data);
        setBook(data);
      } catch (error) {
        setErrMsg("A book with that ID could not be found.");
        return;
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) return;
  if (!book) return <h1>Loading</h1>;

  let PDF_FILE = book["PDF File Name"] || "";
  let EPUB_FILE = book["EPUB File Name"] || "";

  if (
    !PDF_FILE &&
    book["PDF / EPUB File Name"] &&
    book["PDF / EPUB File Name"].length > 0
  ) {
    PDF_FILE =
      book["PDF / EPUB File Name"].find((fileName: string) =>
        fileName.endsWith(".pdf")
      ) || "";
    EPUB_FILE =
      book["PDF / EPUB File Name"].find((fileName: string) =>
        fileName.endsWith(".epub")
      ) || "";
  }

  console.log(PDF_FILE, EPUB_FILE);

  return (
    <main className="flex w-full min-h-screen bg-base-200">
      <Navbar />
      {searchResults.length <= 0 ? (
        <div className="flex w-full mt-32 lg:mt-48 mx-12 lg:mx-20 mb-16">
          {errMsg ? (
            <h3 className="text-lg font-bold text-base-content/80">{errMsg}</h3>
          ) : (
            <div className="flex flex-col lg:flex-row w-full flex-1">
              <div className="w-full lg:w-1/2 flex justify-center mr-12 mb-12 lg:mb-0">
                <img
                  className="max-h-[600px]"
                  src={`/books/${book["folder_path"]}/${book["thumbnail"]}`}
                  alt={book["Full Book Name"]}
                />
              </div>
              <div className="flex-1 flex-col">
                <h2 className="text-2xl font-bold text-base-content mb-4">
                  {book["Full Book Name"]}
                </h2>
                <div
                  tabIndex={0}
                  className="collapse collapse-arrow border-base-300 bg-base-100 border"
                >
                  <div className="collapse-title text-lg font-medium">
                    Description
                  </div>
                  <div className="collapse-content">
                    <p className="text-sm font-semibold text-base-content/90 mb-2">
                      {book.description}
                    </p>
                  </div>
                </div>

                <ul className="mt-8">
                  <li className="text-lg text-base-content/80 font-semibold mb-4">
                    <span className="font-bold text-base-content mr-1">
                      Author:
                    </span>{" "}
                    {book["Author Name"]}
                  </li>
                  <li className="text-base-content/80 font-semibold mb-8">
                    <div className="flex flex-col lg:flex-row">
                      <span className="font-bold text-base-content mb-2 lg:mr-4 lg:mb-0">
                        Genres:
                      </span>{" "}
                      <div className="w-full flex flex-wrap gap-2">
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
                    </div>
                  </li>
                  <li className="text-base-content/80 font-semibold mb-1">
                    <span className="font-bold text-base-content mr-1">
                      Date of Publication:
                    </span>{" "}
                    {book["Date of Publication"]}
                  </li>
                  {book["source"] == "OceanOfPdf" ? (
                    <>
                      <li className="text-base-content/80 font-semibold mb-1">
                        <span className="font-bold text-base-content mr-1">
                          PDF Size:
                        </span>{" "}
                        {typeof book?.["PDF File Size"] === "string"
                          ? book["PDF File Size"]
                          : typeof book?.["PDF File Size"] === "object" &&
                            book["PDF File Size"] !== null
                          ? `${book["PDF File Size"].size} ${book["PDF File Size"].unit}`
                          : "Not Available"}
                      </li>
                      <li className="text-base-content/80 font-semibold mb-1">
                        <span className="font-bold text-base-content mr-1">
                          EPUB Size:
                        </span>{" "}
                        {typeof book?.["EPUB File Size"] === "string"
                          ? book["EPUB File Size"]
                          : typeof book?.["EPUB File Size"] === "object" &&
                            book["EPUB File Size"] !== null
                          ? `${book["EPUB File Size"].size} ${book["EPUB File Size"].unit}`
                          : "Not Available"}
                      </li>
                      <div className="flex flex-col mt-12">
                        {PDF_FILE && (
                          <div className="flex items-center">
                            <a
                              href={`/books/${book.folder_path}/_OceanofPDF.com_${PDF_FILE}`}
                              target="_blank"
                              className="btn btn-primary mr-6 shadow-md border-accent"
                            >
                              Open PDF
                            </a>
                            <a
                              href={`/books/${book.folder_path}/_OceanofPDF.com_${PDF_FILE}`}
                              className="btn btn-primary mr-6 shadow-md border-accent"
                              download
                            >
                              Download PDF
                            </a>
                          </div>
                        )}
                        {EPUB_FILE && (
                          <div className="flex items-center mt-6">
                            <a
                              href={`/books/${book.folder_path}/_OceanofPDF.com_${EPUB_FILE}`}
                              className="btn btn-secondary mr-6 shadow-md border-accent"
                            >
                              Open EPUB
                            </a>
                            <a
                              href={`/books/${book.folder_path}/_OceanofPDF.com_${EPUB_FILE}`}
                              download
                              className="btn btn-secondary shadow-md border-accent"
                            >
                              Download EPUB
                            </a>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <li className="text-base-content/80 font-semibold mb-1">
                        <span className="font-bold text-base-content mr-1">
                          File Size:
                        </span>{" "}
                        {book.file_data}
                      </li>
                      <div className="flex flex-col mt-12">
                        <div className="flex items-center">
                          <a
                            href={`/books/${book.folder_path}/${book.file_name}`}
                            target="_blank"
                            className="btn btn-primary mr-6 shadow-md border-accent"
                          >
                            Open File
                          </a>
                          <a
                            href={`/books/${book.folder_path}/${book.file_name}`}
                            className="btn btn-primary mr-6 shadow-md border-accent"
                            download
                          >
                            Download File
                          </a>
                        </div>
                      </div>
                    </>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex w-full my-32 mx-20">
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
        </div>
      )}
    </main>
  );
}
