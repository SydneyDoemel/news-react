import React, { useEffect, useState } from 'react'
import '../article.css'
import { published_date } from "../Regex";
import { BsBookmark , BsBookmarkFill} from "react-icons/bs";
export default function HeaderArticles({articleInfo, user, savedList}) {
  const [forceRender, setForceRender] = useState(0)
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
    setForceRender(prev => prev + 1);
    
  };
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
    setForceRender(prev => prev + 1);
    
   
  };
useEffect(()=>{
  return
},[forceRender])

  return (
    <div className="card my-2 header-card" >
                <a className="card-body d-flex align-items-end header-link" href={articleInfo.url} style={{backgroundImage: `linear-gradient(rgba(219, 112, 147, 0), rgba(0, 0, 0, .8)), url(${articleInfo.urlToImage})`, backgroundSize: 'cover'}}>
                  <div className="card-title ">
                    <h5 style={{color:'white'}}>{articleInfo.title}</h5>
                    {/* <p className='text-center mt-3'><b>{articleInfo.author}</b></p> */}
                    <p className="card-text" style={{color:'white'}}>{articleInfo.source.name} ({published_date.exec(articleInfo.publishedAt)})</p> 
                    </div>
                    {savedList? <>
                    {savedList.includes(articleInfo.title)?<>
                      <form onSubmit={(e)=>delArticle(e)}>
                    <button type='submit' className='btn'><BsBookmarkFill className="unsave-btn" size={25} color={'white'}/></button>
                    <input type='hidden' name="delart" defaultValue={articleInfo.title}/>
                
                    </form>
                    </>:<>
                    <form onSubmit={(e)=>sendArticle(e)}>
                      <input type='hidden' name='title' defaultValue={articleInfo.title}/>
                      <input type='hidden' name='author' defaultValue={articleInfo.author}/>
                      <input type='hidden' name='sourcename' defaultValue={articleInfo.source.name}/>
                      <input type='hidden' name='description' defaultValue={articleInfo.description}/>
                      <input type='hidden' name='url' defaultValue={articleInfo.url}/>
                      <input type='hidden' name='urltoimage' defaultValue={articleInfo.urlToImage}/>
                      <input type='hidden' name='publishedat' defaultValue={articleInfo.publishedAt}/>
                    <button className="btn big-save-btn" type="submit" ><BsBookmark  className="save-btn" size={25} color={'white'}/></button>
                    
                    </form>
                    </> }
                    </>:<></>}
                </a>
                {/* <div className='card-footer '>
                <div className='d-flex justify-content-between'>
                 
                    {savedList? <>
                    {savedList.includes(articleInfo.title)?<>
                      <form onSubmit={(e)=>delArticle(e)}>
                    <button type='submit' className='btn'><BsBookmarkFill className="unsave-btn" size={25}/></button>
                    <input type='hidden' name="delart" defaultValue={articleInfo.title}/>
                
                    </form>
                    </>:<>
                    <form onSubmit={(e)=>sendArticle(e)}>
                      <input type='hidden' name='title' defaultValue={articleInfo.title}/>
                      <input type='hidden' name='author' defaultValue={articleInfo.author}/>
                      <input type='hidden' name='sourcename' defaultValue={articleInfo.source.name}/>
                      <input type='hidden' name='description' defaultValue={articleInfo.description}/>
                      <input type='hidden' name='url' defaultValue={articleInfo.url}/>
                      <input type='hidden' name='urltoimage' defaultValue={articleInfo.urlToImage}/>
                      <input type='hidden' name='publishedat' defaultValue={articleInfo.publishedAt}/>
                    <button className="btn big-save-btn" type="submit" ><BsBookmark  className="save-btn" size={25}/></button>
                    
                    </form>
                    </> }
                    </>:<></>}
                    </div>
                    </div> */}
            </div>
  )
}

// dateforme.exec

