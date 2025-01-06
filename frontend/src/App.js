import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage'
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AddPostPage from './pages/AddPostPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>}>
          <Route path='/search' element={<SearchPage/>} />
          <Route path='/addPost' element={<AddPostPage/>} />
        </Route>
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/signup' element={<SignupPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
