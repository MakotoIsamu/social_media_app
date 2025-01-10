import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage'
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AddPostPage from './pages/AddPostPage';
import { useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';
import ReelsPage from './pages/ReelsPage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
import EditProfilePage from './pages/EditProfilePage';
import AccountPage from './pages/AccountPage';
import CreateSomething from './pages/CreateSomething';
import AddTweet from './pages/AddTweetPage';
import UploadShortsPage from './pages/UploadShortsPage';

function App() {

  const {Auth} = useContext(AuthContext)

  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>}>
          <Route path='search' element={<SearchPage/>} />
          <Route 
            path='addPost' 
            element={
              <ProtectedRoute>
                <AddPostPage/>
              </ProtectedRoute>
            } 
          />
          <Route 
            path='profile' 
            element={
              <ProtectedRoute>
                <ProfilePage/>
              </ProtectedRoute>
            } 
          />
          <Route 
            path='edit-profile' 
            element={
              <ProtectedRoute>
                <EditProfilePage/>
              </ProtectedRoute>
            } 
          />
          <Route path='/:username/:id' element={<AccountPage/>} />
        </Route>
        <Route path='/create-something' element={<CreateSomething/>} />
        <Route path='/addTweet' element={<AddTweet/>} />
        <Route path='/uploadShorts' element={<UploadShortsPage/>} />
        <Route path='/reels' element={<ReelsPage/>} />
        <Route path='/login' element={Auth ? <Navigate to='/' replace/> : <LoginPage/>} />
        <Route path='/signup' element={Auth ? <Navigate to='/' replace/> : <SignupPage/>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;