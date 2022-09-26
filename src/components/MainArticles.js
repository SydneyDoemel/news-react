import React, { useEffect, useState } from 'react'

import { published_date } from "../Regex";
import { BsFillBookmarksFill, BsBookmark , BsBookmarkFill} from "react-icons/bs";
export default function MainArticles({articleInfo, user, savedList}) {
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
    <div className="container-fluid main-art-div">
    <div className="row">
        <div className="col-12 mb-1">
            <div className="card">
                <div className="card-horizontal">
                    <div className="img-square-wrapper">
                        <img className="main-img" src={articleInfo.urlToImage} />
                    </div>
                    <div className="card-body main-card-body">
                        <h4 className="card-title">{articleInfo.title}</h4>
                        <p className="card-text"><b>{articleInfo.source.name}</b> {published_date.exec(articleInfo.publishedAt)}</p>
                        {/* <p className="card-text">{articleInfo.description}</p> */}
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</div>
  )
}

// dateforme.exec








// <div className="card my-2" >
                
// <div className="card-body d-flex align-items-end" style={{backgroundImage: `linear-gradient(rgba(219, 112, 147, 0), rgba(0, 0, 0, .8)), url(${articleInfo.urlToImage})`, backgroundSize: 'cover'}}>
//   <div className="card-title ">
//     <h5 style={{color:'white'}}>{articleInfo.title}</h5>
//     {/* <p className='text-center mt-3'><b>{articleInfo.author}</b></p> */}
//     <p className="card-text" style={{color:'white'}}>{articleInfo.source.name} ({published_date.exec(articleInfo.publishedAt)})</p> 
//     </div>
    
   
   
    
// </div>
// <div className='card-footer '>

// <div className='d-flex justify-content-between'>
//     <a href={articleInfo.url} className="btn btn-primary">Go to article</a>
//     {savedList? <>
//     {savedList.includes(articleInfo.title)?<>
//       <form onSubmit={(e)=>delArticle(e)}>
//     <button type='submit' className='btn'><BsBookmarkFill className="unsave-btn" size={25}/></button>
//     <input type='hidden' name="delart" defaultValue={articleInfo.title}/>

//     </form>
//     </>:<>
//     <form onSubmit={(e)=>sendArticle(e)}>
//       <input type='hidden' name='title' defaultValue={articleInfo.title}/>
//       <input type='hidden' name='author' defaultValue={articleInfo.author}/>
//       <input type='hidden' name='sourcename' defaultValue={articleInfo.source.name}/>
//       <input type='hidden' name='description' defaultValue={articleInfo.description}/>
//       <input type='hidden' name='url' defaultValue={articleInfo.url}/>
//       <input type='hidden' name='urltoimage' defaultValue={articleInfo.urlToImage}/>
//       <input type='hidden' name='publishedat' defaultValue={articleInfo.publishedAt}/>
//     <button className="btn big-save-btn" type="submit" ><BsBookmark  className="save-btn" size={25}/></button>
    
//     </form>
//     </> }
//     </>:<></>}
//     </div>
//     </div>
// </div>
