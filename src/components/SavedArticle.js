import React from "react";

import "../article.css";
import { published_date } from "../Regex";
export default function SavedArticle({
  articleInfo,
  user,
  getArticles,
  savedArticlesLst,
}) {
  const delArticle = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/delarticle", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        article: e.target.delart.value,
      }),
    });
    const data = await res.json();
    console.log(data);
    getArticles();
  };
  return (
    <>
      <div className="card my-4" style={{ width: "18rem" }}>
        <a href={articleInfo.url} className="card-link">
          <img src={articleInfo.url_image} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{articleInfo.title}</h5>
            <p>
              {articleInfo.author} - {articleInfo.source_name}
            </p>
            <p className="card-text">
              {articleInfo.source_name} (
              {published_date.exec(articleInfo.published_at)})
            </p>
          </div>
          <div className="card-footer d-flex justify-content-between">
            <form onSubmit={(e) => delArticle(e)}>
              <button type="submit" className="btn btn-danger">
                Unsave
              </button>
              <input type="hidden" name="delart" value={articleInfo.title} />
            </form>
          </div>
        </a>
      </div>
    </>
  );
}
