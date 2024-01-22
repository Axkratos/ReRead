import React from 'react'
import Home from './Components/Home/home.jsx'
import Navbar from './Components/Navbar/navbar.jsx'
import Register from './Components/Register/register.jsx'
import Login from './Components/Login/login.jsx'
import SellBook from './Components/SellBook/sellbook.jsx'
import Used from './Components/UsedBook/usedbook.jsx'
import Competitive from './Components/Competitive/competitive.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Novel from './Components/Novel/novel.jsx'

import UserProfile from './Components/User/userprofile.jsx'
import UserPost from './Components/User/userpost.jsx'



import BookDetail from './Components/Card/card.jsx'
import Landingpage from './Components/Landingpage/landingpage.jsx'
function App() {
  

  return (
    <>

    {/* <UserProfile /> */}
    
    
    
        <Router>
     <Navbar/>
      <Routes>
      
      <Route path="/" element={<Home/>}></Route>
<Route path="/used-books" element={<Used/>}></Route>
<Route path="/competitive-books" element={<Competitive/>}></Route>
<Route path="/novels" element={<Novel/>}></Route>
<Route path="/signup" element={<Register/>}></Route>
<Route path="/signin" element={<Login />}></Route>
<Route path="/sell-book" element={<SellBook />}></Route>
<Route path="/landing-page" element={<Landingpage />}></Route>
<Route path="/books/:bookId" element={<BookDetail/>} />
<Route path="/user-profile" element={<UserProfile />}></Route>
<Route path="/user-post" element={<UserPost />}></Route>


</Routes>

    </Router>
    </>
  )
}

export default App
