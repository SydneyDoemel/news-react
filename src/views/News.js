import React, { Component, useEffect, useState } from 'react'
import Article from '../components/Article';
import HeaderArticles from '../components/HeaderArticles';
import MainArticles from '../components/MainArticles';

// import React from 'react'
 let articles_lst=[]

export default function News({user, savedList}) {
    const [articlesLst, setArticlesLst]=useState([])
    const [articles, setArticles]=useState([])
    const [headerArticles, setHeaderArticles]=useState([])
    const [mainArticles, setMainArticles]=useState([])
    
    const [myCats, setMyCats]=useState([])
    const [searchString, setSearchString]=useState()
    const [forceRender, setForceRender] = useState(0)
    const date = new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"long", day:"numeric"}) 
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
        const listCats=data.categories;
        setMyCats(listCats)
    }
    
    useEffect(()=>{
        // getNews('bitcoin', 'sports')
        getCategories();
       
    },[])
    useEffect(()=>{
        
        getNews(searchString);
    },[searchString])


    const showArticles = () => {
        return articles.map((a, i) => 
            (
                <Article key={i} savedList={savedList} user={user} articleInfo={a}/>
            )
        )
    }
    const showHeaderArticles = () => {
        return headerArticles.map((a, i) => 
            (
                <HeaderArticles key={i} savedList={savedList} user={user} articleInfo={a}/>
            )
        )
    }
    const showMainArticles = () => {
        return mainArticles.map((a, i) => 
            (
                <MainArticles key={i} savedList={savedList} user={user} articleInfo={a}/>
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
            <div className='d-flex flex-row justify-content-between'>
                <h3 className='my-4'>{date}</h3>

                <form className='d-flex my-4 ' role='search' onSubmit={search}>
                    <input className='form-control w-75 me-3' type='search' name='search'/>
                    <button className='btn btn-outline-success me-3'>Search</button>
                </form>
                </div>
                {/* <div className='row'>
                    <div className='col-lg-6 col-sm-9 col-xs-4'>{showHeaderArticles()}</div>
                    <div className='col-lg-6 col-sm-6 col-xs-6'> {showMainArticles()}</div>
                </div> */}
                <div className='row d-flex justify-content-around'>


                    {showArticles()}
                </div>
            </div>
    </div>
  )}
