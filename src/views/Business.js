import React, { useEffect, useState } from "react";
import Article from "../components/Article";
export default function Business({ category, user, savedList }) {
  const [articles, setArticles] = useState([]);
  const getNews = async (cat) => {
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&category=${cat}&apiKey=18ff32c491614efe949c74297bdd578c&pageSize=20`
    );
    const data = await res.json();
    console.log(data);
    setArticles(data.articles);
    console.log(`searched for ${cat}`);
  };

  useEffect(() => {
    getNews(category);
  }, [category, savedList]);

  const showArticles = () => {
    return articles.map((a, i) => (
      <Article key={i} savedList={savedList} user={user} articleInfo={a} />
    ));
  };

  return (
    <div className="category-container">
      <div>
        <h3 className="display-5 my-4">{category}</h3>

        <div className="row d-flex justify-content-around">
          {showArticles()}
        </div>
      </div>
    </div>
  );
}
