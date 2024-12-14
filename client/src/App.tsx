import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { useEffect } from 'react';
import axios from 'axios';

function App() {
    useEffect(() => {
        axios.get('/api').then((res) => {  // check the proxy thing works
            console.log(res.data);
        });
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
    );
}

export default App;
