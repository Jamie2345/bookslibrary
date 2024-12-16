import { useSearch } from "../context/SearchContext";
import { useState } from "react";
import axios from "axios";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const { setSearchResults } = useSearch();

  const handleSearch = async () => {
    try {
      console.log(searchQuery);
      const response = await axios.get(`/api/search?q=${searchQuery}`);
      const data = response.data;
      console.log(data);
      setSearchResults(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header>
      <div className="px-8 py-4 bg-base-200 fixed top-0 left-0 w-full z-10 flex items-center border-b-[1px] border-base-300 justify-between navbar">
        <div className="navbar-start">
          <a href="/" className="text-lg font-bold text-base-content">
            Jamie's Library
          </a>
        </div>
        <div className="navbar-center hidden px-2 mr-24 lg:flex">
          <ul className="menu menu-horizontal px-1 mr-2">
            <li>
              <a>Search</a>
            </li>
            <li>
              <a>Theme</a>
            </li>
            <li>
              <a>Random</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <input
            placeholder="Enter search"
            className="rounded-md border-[1px] border-primary p-2 w-full max-w-64 mr-2"
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          ></input>
          <button className="bg-primary text-primary-content shadow-md rounded-md p-2 h-[42px] w-full max-w-16 text-sm font-semibold" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </header>
  );
}