import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Book from "./pages/Book";
import Search from "./pages/Search";

import { SearchProvider } from "./context/SearchContext";

function App() {
  return (
    <SearchProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book/:id" element={<Book />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </Router>
    </SearchProvider>
  );
}

export default App;
