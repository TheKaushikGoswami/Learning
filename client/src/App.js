import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';

function App() {
  return (
    <div className="App">
      <Router>
        <header>
        <Link to="/" className='link'>Home</Link>
        <br></br>
        <Link to="/createpost" className='link'>Create a Post</Link>
        <br></br>
        <Link to="/register" className='link'>Register</Link>
        <br></br>
        <Link to="/login" className='link'>Login</Link>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/posts/:id" element={<Post />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
