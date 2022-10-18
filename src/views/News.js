import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Article from "../components/Article";
import "../article.css";

export default function News({ user, savedList }) {
  const [articles, setArticles] = useState([]);
  const [guestArticles, setGuestArticles] = useState([]);
  const [myCats, setMyCats] = useState([]);
  const [searchString, setSearchString] = useState();

  const date = new Date().toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const getNews = async (input) => {
    const res = await fetch(
      `https://newsapi.org/v2/everything?q=${input}&sortBy=relevancy&apiKey=ace489dd71b74e8f9cf8aeedf4c0a864&pageSize=15`
    );
    const data = await res.json();
    console.log(data.articles);
    const arts = data.articles;
    setArticles((articles) => [...articles, ...arts]);
  };

  const guestNews = async (input) => {
    const res = await fetch(
      `https://newsapi.org/v2/everything?q=${input}&apiKey=18ff32c491614efe949c74297bdd578c&pageSize=20`
    );
    const data = await res.json();
    console.log(data);
    setGuestArticles(data.articles);
    console.log(`searched for ${input}`);
  };

  const getCategories = async () => {
    const res = await fetch(
      `http://localhost:5000/api/savedcategories/${user.id}`
    );
    const data = await res.json();
    const new_cat = data.search;
    setSearchString(new_cat);
    console.log(new_cat);
    const listCats = data.categories;
    setMyCats(listCats);
  };
  const myNewsArticles = () => {
    if (articles) {
      for (let x of myCats) {
        getNews(x);
      }
    } else {
      getNews("general");
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    myNewsArticles();
  }, [myCats]);
  useEffect(() => {
    guestNews("today");
  }, []);

  const showArticles = () => {
    return articles.map((a, i) => (
      <Article
        key={i}
        getNews={getNews}
        savedList={savedList}
        user={user}
        articleInfo={a}
      />
    ));
  };
  const showGuestArticles = () => {
    return guestArticles.map((a, i) => (
      <Article
        key={i}
        getNews={getNews}
        savedList={savedList}
        user={user}
        articleInfo={a}
      />
    ));
  };

  const search = (e) => {
    e.preventDefault();
    const input = e.target.search.value;
    guestNews(input);
  };

  return (
    <div>
      <div className="news-container">
        <div>
          <h3 className="dispatched-font-news-header display-4">Dispatched</h3>
          <div className="d-flex flex-row justify-content-between">
            <h3 className="my-4">{date}</h3>
            <form className="d-flex mt-4 mb-4" role="search" onSubmit={search}>
              <input
                className="form-control w-75 me-3"
                type="search"
                name="search"
              />
              <button className="btn btn-outline-success me-3 mb-3">
                Search
              </button>
            </form>
          </div>
        </div>

        {user.username ? (
          <>
            <div className="row d-flex justify-content-around">
              {showArticles()}
            </div>
          </>
        ) : (
          <>
            <div className="my-5 d-flex news-blurb flex-row align-items-baseline justify-content-center">
              <Link className="sign-up-link me-2" to="/signup">
                Sign up{" "}
              </Link>
              <p className="me-2">to</p>
              <p className="dispatched-font-news me-2">Dispatched</p> to save
              articles and customize the news you see!{" "}
            </div>
            <div className="row d-flex justify-content-around">
              {showGuestArticles()}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
