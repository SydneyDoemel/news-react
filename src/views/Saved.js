import React, { useEffect, useState } from 'react'
import Article from '../components/Article';
import '../article.css'
import SavedArticle from '../components/SavedArticle';

export default function Saved({user}) {
  const [savedArticles, setSavedArticles]= useState([])

  const getArticles = async () => {
    const res = await fetch(
      `http://localhost:5000/api/savedarticles/${user.id}`
    );
    const data = await res.json();
    const new_art = data;
    setSavedArticles(data.articles);
    console.log(data);
  };
 
  useEffect(() => {
    getArticles();
  }, []);
  const showArticles = () => {
    return savedArticles.map((a, i) => 
        (
            <SavedArticle key={i} savedArticlesLst={savedArticles} getArticles={getArticles} user={user} articleInfo={a}/>
        )
    )
}

  return (
    <div className='saved-container'>
      <div>
        <h3 className='display-5 my-4 '>Saved Articles</h3>
      </div>
      <div className='row d-flex justify-content-around'>
        {showArticles()}
      </div>
      </div>
  )
}
