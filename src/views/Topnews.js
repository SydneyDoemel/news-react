import React, { Component, useEffect, useState } from 'react'
import Article from '../components/Article';

// import React from 'react'

export default function Topnews({user}) {
    const [articles, setArticles]=useState([])
    const [homeArticles, setHomeArticles]=useState([])


    const getNews = async (input) => {
        const res = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=ace489dd71b74e8f9cf8aeedf4c0a864&pageSize=20`);
        const data = await res.json()
        console.log(data)
        setArticles(data.articles)
    }
   
  
    
    useEffect(()=>{
        getNews()
    },[])

    const showArticles = () => {
        return articles.map((a, i) => 
            (
                <Article key={i} user={user} articleInfo={a}/>
            )
        )
    }

    

  return (
    <div>
        <div>
                
        <h3 className="text-center my-4">Top News Stories</h3>
               
                <div className='row'>


                    {showArticles()}
                </div>
            </div>
    </div>
  )}