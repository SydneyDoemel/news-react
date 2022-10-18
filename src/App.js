import React, { useState, useEffect } from 'react'
import Nav from './components/Nav'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import News from './views/News'
import Login from './views/Login'
import SignUp from './views/SignUp'
import Business from './views/Business'
import Topnews from './views/Topnews'
import Preferences from './views/Preferences'
import Saved from './views/Saved'
import Article from './components/Article'
import Footer from './components/Footer'


export default function App() {
 
  const [savedArticles, setSavedArticles]= useState([])
  const [category, setCategory]=useState()

  const getUserFromLocalStorage = () => {
    const foundUser = localStorage.getItem('user')
    if (foundUser){
      return JSON.parse(foundUser)
    }
    return {}
  };

  const [user, setUser] = useState(getUserFromLocalStorage());
  const [newUser, setNewUser]=useState(1)
 


  const myCategories = (section) => {
    setCategory(section)
   
  }
  const logMeIn = (user) => {
    setUser(user)
    localStorage.setItem('user', JSON.stringify(user));
    let x = newUser+1
    setNewUser(x);
  }
  const logMeOut = () => {
    setUser({})
    localStorage.removeItem('user')
  }

  const getArticles = async () => {
    const res = await fetch(
      `http://localhost:5000/api/savedarticles/${user.id}`
    );
    const data = await res.json();
    const new_art = data;
    console.log(data.articles);
    const new_lst=[];
    for (let x of data.articles){
      new_lst.push(x.title)
    }
    setSavedArticles(new_lst);
  };
  useEffect(()=>{
    getArticles()
  },[])


  return (
    <BrowserRouter>
      <div className='page-container'>
        <Nav category={category} setCategory={setCategory} user={user}  logMeOut={logMeOut}/>
        

        <div className='content-wrap'>
        <Routes>
         
          <Route path='/' element={<News savedList={savedArticles} user={user}/>} />
          
          <Route path='/login' element={<Login logMeIn={logMeIn} />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/business' element={<Business user={user} savedList={savedArticles} category={category} />} />
          <Route path='/health' element={<Business user={user} savedList={savedArticles} category={category} />} />
          <Route path='/technology' element={<Business user={user} savedList={savedArticles} category={category} />} />
          <Route path='/science' element={<Business user={user} savedList={savedArticles} category={category} />} />
          <Route path='/entertainment' element={<Business savedList={savedArticles} user={user} category={category} />} />
          <Route path='/sports' element={<Business savedList={savedArticles} user={user} category={category} />} />
          <Route path='/top' element={<Topnews savedList={savedArticles} user={user}/>} />
          <Route path='/preferences' element={<Preferences newUser={newUser} savedList={savedArticles} user={user}/>} />
          <Route path='/saved' element={<Saved savedList={savedArticles} user={user}/>} />
          <Route path='/article' element={<Article  savedList={savedArticles} user={user}/>} />
          
        
          
        </Routes>
        </div>
        <div className='footer d-flex justify-content-center align-items-center'>
    <Footer />
    </div>
      </div>

    </BrowserRouter>
  )

}