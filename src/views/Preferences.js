import React, { useEffect, useState } from "react";
import '../article.css'
export default function Preferences({ user }) {
  const [savedCats, setSavedCats] = useState([]);

  const search = (e) => {
    e.preventDefault();
    const input = e.target.search.value;
  };
  const sendCategory = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/addcategory", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category: e.target.category.value,
      }),
    });
    const data = await res.json();
    console.log(data);
    getCategories()
  };

  const getCategories = async () => {
    const res = await fetch(
      `http://localhost:5000/api/savedcategories/${user.id}`
    );
    const data = await res.json();
    const new_cat = data;
    setSavedCats(data.categories);
    console.log(data);
  };
  const delCategory = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/delcategory", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category: e.target.delcat.value,
      }),
    });
    const data = await res.json();
    console.log(data);
    getCategories();
  };
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      
  <div className="pref-container">
    <div className="pref-header text-center my-3">
      <h2>Preferences</h2>
    </div>
  <div className="pref-add-cats ">
    <form className="mt-4 d-flex flex-row justify-content-center" onSubmit={(e) => sendCategory(e)}>
    <input className="form-control me-2 w-25" name="category" placeholder="Chicago Pizza"/>
    <button className="btn btn-primary">Add</button>
  </form>
  </div>
  <div className="my-cats text-center ">
  <h4>Saved Interests</h4>
  <ul className="ms-5">
            {savedCats? <>
            {savedCats.map((title) => (
              <>
                <li className="d-flex flex-row align-items-baseline my-5">
                  <p className="w-50">{title}</p>
                  <form onSubmit={(e) => delCategory(e)}>
                    <button className="btn ">
                    <i class="fa-solid fa-x"></i>
                    </button>
                    <input type="hidden" value={title} name="delcat" />
                  </form>
                </li>
              </>
            ))}
            </>:<><p>No Saved Interests</p></>}
          </ul>
  </div>
  <div className="suggested-cats px-4">
  <div className="row d-flex justify-content-around mx-auto">
            
            <div className=" category-square d-flex flex-column justify-content-between card my-3" style={{ width: "16rem", height:"16rem" }}>
            <img className="card-img-top" src='https://image.cnbcfm.com/api/v1/image/106240744-1573590258713politicaldebate.jpg?v=1573590321&w=740&h=416&ffmt=webp' alt="Card image cap" />
            
            <form className='card-text  d-flex flex-row align-items-baseline justify-content-between' onSubmit={(e) => sendCategory(e)}>
                <p className="text-center">Politics</p>
                <button className="btn  w-25"><i class="fa-solid fa-plus"></i></button>
                <input type="hidden" name="category" value="politics" />
                </form>
                
              </div>
            
            <div className=" category-square d-flex flex-column justify-content-between card my-3" style={{ width: "16rem", height:"16rem" }}>
            <img className="card-img-top" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEBDNuljT67FePs846ERFP87mYI7mBQEQTBQ&usqp=CAU' alt="Card image cap" />
            
            <form className='card-text  d-flex flex-row align-items-baseline justify-content-between' onSubmit={(e) => sendCategory(e)}>
                <p className="text-center">Music</p>
                <button className="btn  w-25"><i class="fa-solid fa-plus"></i></button>
                <input type="hidden" name="category" value="music" />
                </form>
                
              
            </div>
            <div className=" category-square d-flex flex-column justify-content-between card my-3" style={{ width: "16rem", height:"16rem" }}>
            <img className="card-img-top" src='https://inoxoft.com/app/uploads/2020/04/image-2@2x-80-min.jpg' alt="Card image cap" />
            
            <form className='card-text  d-flex flex-row align-items-baseline justify-content-between' onSubmit={(e) => sendCategory(e)}>
                <p className="text-center">Education</p>
                <button className="btn  w-25"><i class="fa-solid fa-plus"></i></button>
                <input type="hidden" name="category" value="education" />
                </form>
                
              
            </div>
            <div className=" category-square d-flex flex-column justify-content-between card my-3" style={{ width: "16rem", height:"16rem" }}>
            <img className="card-img-top" src='https://www.foundationlist.org/wp-content/uploads/2015/03/Nonprofit-Image.jpg' alt="Card image cap" />
            
            <form className='card-text d-flex flex-row align-items-baseline justify-content-between' onSubmit={(e) => sendCategory(e)}>
                <p className="text-center">Nonprofit</p>
                <button className="btn w-25 "><i class="fa-solid fa-plus"></i></button>
                <input type="hidden" name="category" value="nonprofit" />
                </form>
                
              
            </div>
            <div className=" category-square d-flex flex-column justify-content-between card my-3" style={{ width: "16rem", height:"16rem" }}>
            <img className="card-img-top" src='https://www.mondaycampaigns.org/wp-content/uploads/2020/01/move-it-monday-feature-walking-is-real-exercise.png' alt="Card image cap" />
            
            <form className='card-text  d-flex flex-row align-items-baseline justify-content-between' onSubmit={(e) => sendCategory(e)}>
                <p className="text-center">Fitness</p>
                <button className="btn w-25"><i class="fa-solid fa-plus"></i></button>
                <input type="hidden" name="category" value="fitness" />
                </form>
                
              
            </div>
            <div className=" category-square d-flex flex-column justify-content-between card my-3" style={{ width: "16rem", height:"16rem" }}>
            <img className="card-img-top" src='https://ak1.picdn.net/shutterstock/videos/11069651/thumb/1.jpg?ip=x480' alt="Card image cap" />
            
            <form className='card-text  d-flex flex-row align-items-baseline justify-content-between' onSubmit={(e) => sendCategory(e)}>
                <p className="text-center">Movies</p>
                <button className="btn w-125"><i class="fa-solid fa-plus"></i></button>
                <input type="hidden" name="category" value="movies" />
                </form>
                
              </div>
            
           
        </div>
  </div>
</div>
    </>
  );
}



