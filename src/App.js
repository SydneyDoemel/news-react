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
import Article from './components/Article'


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

  const getArticles = async () => {
    const res = await fetch(
      `http://localhost:5000/api/savedarticles/${user.id}`
    );
    const data = await res.json();
    const new_art = data;
    // setSavedArticles(data.articles);
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
      <div>
        <Nav category={category} setCategory={setCategory} user={user}  logMeOut={logMeOut}/>
        


        <Routes>
          {/* <Route path='/' element={<Home />} />  */}
         
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
          <Route path='/preferences' element={<Preferences savedList={savedArticles} user={user}/>} />
          <Route path='/saved' element={<Saved savedList={savedArticles} user={user}/>} />
          <Route path='/article' element={<Article savedList={savedArticles} user={user}/>} />
        
          
        </Routes>


      </div>
    </BrowserRouter>
  )

}