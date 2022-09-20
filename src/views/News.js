import React, { Component, useEffect, useState } from 'react'
import Article from '../components/Article';

// import React from 'react'

export default function News({user}) {
    const [articles, setArticles]=useState([])
    const [homeArticles, setHomeArticles]=useState([])
    const [searchString, setSearchString]=useState()

    const getNews = async (input) => {
        const res = await fetch(`https://newsapi.org/v2/everything?q=${input}&apiKey=ace489dd71b74e8f9cf8aeedf4c0a864&pageSize=20`);
        const data = await res.json()
        console.log(data)
        setArticles(data.articles);
        getCategories;
    }
   
    const getCategories = async () => {
        const res = await fetch(`http://localhost:5000/api/savedcategories/${user.id}`);
        const data = await res.json();
        const new_cat = data.search
        setSearchString(new_cat)
        console.log(new_cat)
        
    }
    
    useEffect(()=>{
        // getNews('bitcoin', 'sports')
        getCategories();
       
    },[])
    useEffect(()=>{
        // getNews('bitcoin', 'sports')
       
        getNews(searchString);
    },[])


    const showArticles = () => {
        return articles.map((a, i) => 
            (
                <Article key={i} articleInfo={a}/>
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
                <h3 className='text-center'>MyNews</h3>

                <form onSubmit={search}>
                    <input name='search'/>
                    <button>Search</button>
                </form>
                <div className='row'>


                    {showArticles()}
                </div>
            </div>
    </div>
  )}

// export default class News extends Component {
//     constructor() {
//         super();
//         // initial state
//         this.state = {
//             articles: [],
//             done: false,
//             homeArticles: [],
//         }
//     }


//     getNews = async (input) => {
//         const res = await fetch(`https://newsapi.org/v2/everything?q=${input}&apiKey=ace489dd71b74e8f9cf8aeedf4c0a864&pageSize=20`);
//         const data = await res.json()
//         console.log(data)
//         this.setState({ articles: data.articles })
//     }
   
//     gethomeNews = async (input) => {
//         const res = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=ace489dd71b74e8f9cf8aeedf4c0a864&pageSize=20`);
//         const data = await res.json()
//         console.log(data)
//         this.setState({ homeArticles: data.articles })
//     }
//     async componentDidMount() {
//         this.getNews('general')
//     }


//     showArticles = () => {
//         return this.state.articles.map((a, i) => 
//             (
//                 <Article key={i} articleInfo={a}/>
//             )
//         )
//     }

//     search = (e) => {
//         e.preventDefault();
//         const input = e.target.search.value;
//         this.getNews(input)
//     };

//     render() {
//         return (
//             <div>
//                 {this.state.done? <p>DONE!</p>: <p>Not done</p>}
//                 <button onClick={()=>{this.setState({done:true})}}>Mark Complete</button>

//                 <form onSubmit={this.search}>
//                     <input name='search'/>
//                     <button>Search</button>
//                 </form>
//                 <div className='row'>


//                     {this.showArticles()}
//                 </div>
//             </div>
//         )
//     }

// }
