import React, { createContext, useState, useContext } from "react";

const SearchContext = createContext<any>(null);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchResults, setSearchResults] = useState([]);

  const resetSearchResults = () => {
    setSearchResults([]);
  };

  return (
    <SearchContext.Provider value={{ searchResults, setSearchResults, resetSearchResults }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);