import React from 'react'
import '../news.css'
import { published_date } from "../Regex";
export default function Article({articleInfo, user}) {
 
  const sendArticle= async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/savedarticles", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: e.target.title.value,
        author: e.target.author.value,
        source_name: e.target.sourcename.value,
        description: e.target.description.value,
        url: e.target.url.value,
        url_image: e.target.urltoimage.value,
        published_at: e.target.publishedat.value,
      }),
    });
    const data = await res.json();
    console.log(data);
    
  };
  return (
    <div className="card" style={{ width: "18rem" }}>
                <img src={articleInfo.urlToImage} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{articleInfo.title}</h5>
                    <p>{articleInfo.author} - {articleInfo.source.name}</p>
                    <p className="card-text">{articleInfo.description}</p>
                    <p className="card-text">{articleInfo.source.name} ({published_date.exec(articleInfo.publishedAt)})</p>
                    <a href={articleInfo.url} className="btn btn-primary">Go to article</a>
                    <form onSubmit={(e)=>sendArticle(e)}>
                      <input type='hidden' name='title' defaultValue={articleInfo.title}/>
                      <input type='hidden' name='author' defaultValue={articleInfo.author}/>
                      <input type='hidden' name='sourcename' defaultValue={articleInfo.source.name}/>
                      <input type='hidden' name='description' defaultValue={articleInfo.description}/>
                      <input type='hidden' name='url' defaultValue={articleInfo.url}/>
                      <input type='hidden' name='urltoimage' defaultValue={articleInfo.urlToImage}/>
                      <input type='hidden' name='publishedat' defaultValue={articleInfo.publishedAt}/>
                    <button className="btn btn-primary" type="submit" >Save Article</button>
                    </form>
                </div>
            </div>
  )
}

// dateforme.exec

