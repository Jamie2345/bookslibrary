import { useSearch } from "../context/SearchContext";
import { useState } from "react";
import axios from "axios";

export default function NavbarNoSearch() {
  const handleRandom = async () => {
    try {
      const response = await axios.get(`/api/randombook`);

      const data = response.data;
      console.log(data);

      if (data.length <= 0) {
        console.log("No results found");
        alert("No results found");
        return;
      }

      if (data._id) {
        window.location.href = `/book/${data._id}`;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header>
      <div className="px-8 py-4 bg-base-200 fixed top-0 left-0 w-full z-10 flex items-center border-b-[1px] border-base-300 justify-between navbar">
        <div className="navbar-start">
          <a href="/" className="text-lg font-bold text-base-content btn btn-ghost">
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
              <button onClick={handleRandom}>Random</button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}