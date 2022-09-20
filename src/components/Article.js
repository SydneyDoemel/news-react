import React from 'react'
import '../news.css'
export default function Article({articleInfo}) {
  return (
    <div className="card" style={{ width: "18rem" }}>
                <img src={articleInfo.urlToImage} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{articleInfo.title}</h5>
                    <p>{articleInfo.author} - {articleInfo.source.name}</p>
                    <p className="card-text">{articleInfo.description}</p>
                    <p className="card-text">{articleInfo.source.name} ({articleInfo.publishedAt})</p>
                    <a href={articleInfo.url} className="btn btn-primary">Go to article</a>
                    <a href={articleInfo.url} className="btn btn-primary">Save Article</a>
                </div>
            </div>
  )
}

