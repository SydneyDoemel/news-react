import React, { Component, useEffect, useState } from 'react'
import Article from '../components/Article';
import HeaderArticles from '../components/HeaderArticles';
import MainArticles from '../components/MainArticles';

// import React from 'react'

export default function News({user, savedList}) {
    const [articlesLst, setArticlesLst]=useState([])
    const [articles, setArticles]=useState([])
    const [headerArticles, setHeaderArticles]=useState([])
    const [mainArticles, setMainArticles]=useState([])
    
    const [myCats, setMyCats]=useState([])
    const [searchString, setSearchString]=useState()
    const [forceRender, setForceRender] = useState(0)
    const getNews = async () => {
        for (let x of myCats){
            const res = await fetch(`https://newsapi.org/v2/everything?q=${x}&sortBy=relevancy&apiKey=ace489dd71b74e8f9cf8aeedf4c0a864&pageSize=10`);
            const data = await res.json()
            console.log(data)
            console.log(x, "!")
        //     const new_lst=[];
        //     for (let x of data.articles){
        //     new_lst.push(x.title)
        // }
             let new_articles=data.articles
             setArticles([...articles, new_articles]);
            
        }
        
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
        
        getNews();
    },[myCats])


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
                <h3 className='text-center my-4'>MyNews</h3>

                <form className='d-flex my-4' role='search' onSubmit={search}>
                    <input className='form-control w-25 me-3' type='search' name='search'/>
                    <button className='btn btn-outline-success'>Search</button>
                </form>
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
