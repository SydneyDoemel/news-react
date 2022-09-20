import React, { useEffect, useState } from 'react'
import Article from '../components/Article';
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
            <SavedArticle key={i} getArticles={getArticles} user={user} articleInfo={a}/>
        )
    )
}

  return (
    <div>
      <div>
        <h3>Saved Articles</h3>
      </div>
      <div>
        {showArticles()}
      </div>
      </div>
  )
}
