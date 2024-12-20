import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Book from "./pages/Book";
import Search from "./pages/Search";
import Theme from "./pages/Theme";

import { SearchProvider } from "./context/SearchContext";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <SearchProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/book/:id" element={<Book />} />
            <Route path="/search" element={<Search />} />
            <Route path="/theme" element={<Theme />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </SearchProvider>
  );
}

export default App;
