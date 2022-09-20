import React, { useState, useEffect } from 'react'
import Home from './views/Home'
import Nav from './components/Nav'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import News from './views/News'
import Login from './views/Login'
import SignUp from './views/SignUp'
import Business from './views/Business'
import Topnews from './views/Topnews'
import Preferences from './views/Preferences'
import Saved from './views/Saved'

export default function App() {
 
  
  const [category, setCategory]=useState()
  const getUserFromLocalStorage = () => {
    const foundUser = localStorage.getItem('user')
    if (foundUser){
      return JSON.parse(foundUser)
    }
    return {}
  };

  const [user, setUser] = useState(getUserFromLocalStorage())
 

  // logMeIn = (user) => {
  //   this.setState({
  //     user: user
  //   })
  // }
  const myCategories = (section) => {
    setCategory(section)
   
  }
  const logMeIn = (user) => {
    setUser(user)
    localStorage.setItem('user', JSON.stringify(user))
  }
  const logMeOut = () => {
    setUser({})
    localStorage.removeItem('user')
  }

  


  return (
    <BrowserRouter>
      <div>
        <Nav category={category} setCategory={setCategory} user={user}  logMeOut={logMeOut}/>


        <Routes>
          <Route path='/' element={<Home />} /> 
         
          <Route path='/news' element={<News user={user}/>} />
          
          <Route path='/login' element={<Login logMeIn={logMeIn} />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/business' element={<Business user={user} category={category} />} />
          <Route path='/health' element={<Business user={user} category={category} />} />
          <Route path='/technology' element={<Business user={user} category={category} />} />
          <Route path='/science' element={<Business user={user} category={category} />} />
          <Route path='/entertainment' element={<Business user={user} category={category} />} />
          <Route path='/sports' element={<Business user={user} category={category} />} />
          <Route path='/top' element={<Topnews user={user}/>} />
          <Route path='/preferences' element={<Preferences user={user}/>} />
          <Route path='/saved' element={<Saved user={user}/>} />
        
          
        </Routes>


      </div>
    </BrowserRouter>
  )

}