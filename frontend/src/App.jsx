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
import BuyerChat from './Components/Card/chat.jsx'


import UserPost from './Components/User/userpost.jsx'
import ChatApp from './Components/User/ChatApp.jsx'




import BookDetail from './Components/Card/card.jsx'
import Landingpage from './Components/Landingpage/landingpage.jsx'
import Demo from './Components/Register/demo.jsx'
function App() {
  

  return (
    <>
    {/* <Demo /> */}

    {/* <UserProfile /> */}
    {/* <BuyerChat /> */}
    
    
    
    
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
<Route path="/message" element={<ChatApp />}></Route>
 <Route path="/user-post" element={<UserPost />}></Route>


</Routes>

    </Router>  
    </>
  )
}

export default App
