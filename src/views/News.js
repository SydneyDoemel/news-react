import React, { Component, useEffect, useState } from 'react'
import Article from '../components/Article';

// import React from 'react'

export default function News({user}) {
    const [articles, setArticles]=useState([])

    const [searchString, setSearchString]=useState()

    const getNews = async (input) => {
        const res = await fetch(`https://newsapi.org/v2/everything?q=${input}&sortBy=relevancy&apiKey=ace489dd71b74e8f9cf8aeedf4c0a864&pageSize=20`);
        const data = await res.json()
        console.log(data)
        setArticles(data.articles);
       
    }
   
    const getCategories = async () => {
        const res = await fetch(`http://localhost:5000/api/savedcategories/${user.id}`);
        const data = await res.json();
        const new_cat = data.search
        setSearchString(new_cat)
        console.log(new_cat);
        
        
    }
    
    useEffect(()=>{
        // getNews('bitcoin', 'sports')
        getCategories();
       
    },[])
    useEffect(()=>{
        // getNews('bitcoin', 'sports')
       
        getNews(searchString);
    },[searchString])


    const showArticles = () => {
        return articles.map((a, i) => 
            (
                <Article key={i} user={user} articleInfo={a}/>
            )
        )
    }

    const search = (e) => {
        e.preventDefault();
        const input = e.target.search.value;
        getNews(input)
    };

  return (
    <div>
        <div>
                <h3 className='text-center'>MyNews</h3>

                <form onSubmit={search}>
                    <input name='search'/>
                    <button>Search</button>
                </form>
                <div className='row'>


                    {showArticles()}
                </div>
            </div>
    </div>
  )}
