import React, {  useEffect, useState } from 'react'
import Article from '../components/Article';



export default function Topnews({user, savedList}) {
    const [articles, setArticles]=useState([])
    


    const getNews = async (input) => {
        const res = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=ace489dd71b74e8f9cf8aeedf4c0a864&pageSize=20`);
        const data = await res.json()
        console.log(data)
        setArticles(data.articles)
    }
   
    useEffect(()=>{
        getNews()
    },[savedList])

    const showArticles = () => {
        return articles.map((a, i) => 
            (
                <Article key={i} savedList={savedList} user={user} articleInfo={a}/>
            )
        )
    }

  return (
    <div className='top-stories-container'>
        <div>
                
        <h3 className="display-4 my-4">Current Headlines</h3>
               
                <div className='row d-flex justify-content-around'>


                    {showArticles()}
                </div>
            </div>
    </div>
  )}