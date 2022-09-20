import React, { useEffect, useState } from "react";
import '../preferences.css'
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
      <div>
        <div className="d-flex flex-column justify-content-center text-center">
          <div>
            <form className="form-inline" onSubmit={(e) => sendCategory(e)}>
              <div className="form-group">
              <input className="form-control w-25" name="category" />
              <div/>
              <button className="btn btn-primary">Add</button>
              </div>
            </form>
          </div>
          <div>
            
            <h4 className="my-5">Suggested categories</h4>
            
            
            <div className="d-flex justify-content-around w-75 ">
            
                <div className="category-square card">
                <img className="card-img-top" src='https://image.cnbcfm.com/api/v1/image/106240744-1573590258713politicaldebate.jpg?v=1573590321&w=740&h=416&ffmt=webp' alt="Card image cap" />
                <div className="card-body">
                <form className='card-text' onSubmit={(e) => sendCategory(e)}>
                    <p>Politics</p>
                    <button className="btn btn-primary">add</button>
                    <input type="hidden" name="category" value="politics" />
                    </form>
                    
                  </div>
                </div>
                <div className="category-square card">
                <img className="card-img-top" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEBDNuljT67FePs846ERFP87mYI7mBQEQTBQ&usqp=CAU' alt="Card image cap" />
                <div className="card-body">
                <form className='card-text' onSubmit={(e) => sendCategory(e)}>
                    <p>Music</p>
                    <button className="btn btn-primary">add</button>
                    <input type="hidden" name="category" value="music" />
                    </form>
                    
                  </div>
                </div>
                <div className="category-square card">
                <img className="card-img-top" src='https://inoxoft.com/app/uploads/2020/04/image-2@2x-80-min.jpg' alt="Card image cap" />
                <div className="card-body">
                <form className='card-text' onSubmit={(e) => sendCategory(e)}>
                    <p>Education</p>
                    <button className="btn btn-primary">add</button>
                    <input type="hidden" name="category" value="education" />
                    </form>
                    
                  </div>
                </div>
                <div className="category-square card">
                <img className="card-img-top" src='https://www.foundationlist.org/wp-content/uploads/2015/03/Nonprofit-Image.jpg' alt="Card image cap" />
                <div className="card-body">
                <form className='card-text' onSubmit={(e) => sendCategory(e)}>
                    <p>Nonprofit</p>
                    <button className="btn btn-primary">add</button>
                    <input type="hidden" name="category" value="nonprofit" />
                    </form>
                    
                  </div>
                </div>
                <div className="category-square card">
                <img className="card-img-top" src='https://health.clevelandclinic.org/wp-content/uploads/sites/3/2022/04/exerciseHowOften-944015592-770x533-1.jpg' alt="Card image cap" />
                <div className="card-body">
                <form className='card-text' onSubmit={(e) => sendCategory(e)}>
                    <p>Fitness</p>
                    <button className="btn btn-primary">add</button>
                    <input type="hidden" name="category" value="fitness" />
                    </form>
                    
                  </div>
                </div>
                <div className="category-square card">
                <img className="card-img-top" src='https://ak1.picdn.net/shutterstock/videos/11069651/thumb/1.jpg?ip=x480' alt="Card image cap" />
                <div className="card-body">
                <form className='card-text' onSubmit={(e) => sendCategory(e)}>
                    <p>Movies</p>
                    <button className="btn btn-primary">add</button>
                    <input type="hidden" name="category" value="movies" />
                    </form>
                    
                  </div>
                </div>
               
            </div>
          </div>
          <ul className="text-center">
            {savedCats.map((title) => (
              <>
                <li className="d-flex  my-5">
                  <p className="me-4">{title}</p>
                  <form onSubmit={(e) => delCategory(e)}>
                    <button className="btn btn-outline-danger">
                      Delete interest
                    </button>
                    <input type="hidden" value={title} name="delcat" />
                  </form>
                </li>
              </>
            ))}
          </ul>
          <p>{}</p>
        </div>
      </div>
    </>
  );
}
