import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Ads } from './pages/Ads';
import { FAQ } from './pages/FAQ';
import { Opportunities } from './pages/Opportunities';
import { Posts } from './pages/Posts';

function App() {
  return (
    <BrowserRouter basename="/ce-mini-app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ads" element={<Ads />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/opportunities" element={<Opportunities />} />
        <Route path="/posts" element={<Posts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
