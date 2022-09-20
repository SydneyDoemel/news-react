import React, { useState, useEffect } from 'react'
import Contact from './views/Contact'
import Home from './views/Home'
import Nav from './components/Nav'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import News from './views/News'
import IG from './views/IG'
import Login from './views/Login'
import SignUp from './views/SignUp'
import CreatePost from './views/CreatePost'
import ToDoList from './views/ToDoList'
import UpdatePost from './views/UpdatePost'
import SinglePost from './views/SinglePost'
import Shop from './views/Shop'
import SingleProduct from './views/SingleProduct'
import Cart from './views/Cart'
import Business from './views/Business'
import Topnews from './views/Topnews'
import Preferences from './views/Preferences'

export default function App() {
  // constructor() {
  //   super();
  //   this.state = {
  //     user: {},
  //     cart: []
  //   }
  // }
  
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
          {/* <Route path='/contact' element={<Contact />} />  */}
          <Route path='/news' element={<News user={user}/>} />
          
          <Route path='/login' element={<Login logMeIn={logMeIn} />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/business' element={<Business category={category} />} />
          <Route path='/health' element={<Business category={category} />} />
          <Route path='/technology' element={<Business category={category} />} />
          <Route path='/science' element={<Business category={category} />} />
          <Route path='/entertainment' element={<Business category={category} />} />
          <Route path='/sports' element={<Business category={category} />} />
          <Route path='/top' element={<Topnews/>} />
          <Route path='/preferences' element={<Preferences user={user}/>} />
          {/* <Route path='/posts/create' element={<CreatePost user={user} />} />
          <Route path='/posts/update/:postId' element={<UpdatePost user={user} />} />
          <Route path='/posts/:postId' element={<SinglePost user={user} />} />
          <Route path='/todo' element={<ToDoList />} />
          <Route path='/shop' element={<Shop addToCart={addToCart} user={user}/>} />
          <Route path='/shop/:productId' element={<SingleProduct />} />
          <Route path='/cart' element={<Cart cart={cart} removeFromCart={removeFromCart} user={user}/>} /> */}
        </Routes>


      </div>
    </BrowserRouter>
  )

}