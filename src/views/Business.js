import React, { Component, useEffect, useState } from 'react'
import Article from '../components/Article';

// import React from 'react'

export default function Business({category}) {
    const [articles, setArticles]=useState([])
   

    const getNews = async (cat) => {
        const res = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${cat}&apiKey=18ff32c491614efe949c74297bdd578c&pageSize=20`);
        const data = await res.json()
        console.log(data)
        setArticles(data.articles)
        console.log(`searched for ${cat}`)
    }
   
  
    // useEffect(()=>{
    //     setCategory(category)
       
    // },[category])
    useEffect(()=>{
        
        getNews(category)
    },[category])

    const showArticles = () => {
        return articles.map((a, i) => 
            (
                <Article key={i} articleInfo={a} />
            )
        )
    }

  

  return (
    <div>
        <div>
                
            <h3 className="text-center my-4">{category}</h3>
                
                <div className='row'>

              
                    {showArticles()}
                </div>
            </div>
    </div>
  )}