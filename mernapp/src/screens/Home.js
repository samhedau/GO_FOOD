import React,{useEffect,useState} from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import Crousel from '../components/Crousel'

export default function Home() {
  const [search,setSearch] = useState([]);
  const [foodCat,setFoodCat] = useState([]);
  const [foodItem,setFoodItem] = useState([]);
  const loadData = async ()=>{
    let response = await fetch("http://localhost:5000/api/foodData",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    response =  await response.json();
    setFoodItem(response[0])
    setFoodCat(response[1])
  }

  useEffect(()=>{
    loadData()
  },[])
  return (
    <div >
      <div>
        <Navbar />
      </div>
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel">

          <div className="carousel-inner " id='carousel'>
            <div className=" carousel-caption  " style={{ zIndex: "9" }}>
              <div className=" d-flex justify-content-center">  {/* justify-content-center, copy this <form> from navbar for search box */}
                <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Search in here..." aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                <button className="btn text-white bg-danger" onClick={() => { setSearch('') }}>Search</button>
              </div>
            </div>
            <div className="carousel-item active" >
              <img src="https://source.unsplash.com/random/900x390/?burger" className="d-block w-100  " style={{ filter: "brightness(75%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/900x390/?pastry" className="d-block w-100 " style={{ filter: "brightness(75%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/900x390/?barbeque" className="d-block w-100 " style={{ filter: "brightness(75%)" }} alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className='container'>
        {foodCat && foodCat.length > 0
          ? foodCat.map((data) => (
              <div className='row mb-3' key={data._id}>
                <div>
                  <div className='fs-3 m-3'>{data.CategoryName}</div>
                </div>
                <hr />
                {foodItem && foodItem.length > 0 ? (
                  foodItem
                    .filter(item => item.CategoryName === data.CategoryName)
                    .map((filterItems) => (
                      <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                        <Card foodItem= {filterItems}
                        options={filterItems.options[0]}></Card>
                        
                      </div>
                    ))
                ) : (
                  <div>No Such Data Found</div>
                )}
              </div>
            ))
          : <div>No Categories Found</div>}
      </div>
      <Footer />
    </div>
  );
  
}