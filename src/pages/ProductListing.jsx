import Footer from "../components/Footer";
import useFetch from "../../useFetch";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductListing = () => {

    const { data, loading, error } = useFetch("https://pustak-bhandar-backend.vercel.app/books");

    const booksIncart = data?.filter((book) => ( book.quantity > 0 ));
    const booksInwishlist = data?.filter((book) => book.addedToWishlist);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [ genre, setGenre ] = useState("");
    const [ rating, setRating ] = useState("");
    const [ price, setPrice ] = useState("");

    const [ searchValue, setSearchValue ] = useState("");


    const [ romanceChecked, setRomanceChecked ] = useState(false);
    const [ fantasyChecked, setFantasyChecked ] = useState(false);
    const [ mystryChecked, setMysteryChecked ] = useState(false);
    const [ scienceChecked, setScienceChecked ] = useState(false);
    const [ selfHelpChecked, setSelfHelpChecked ] = useState(false);

    const handleGenre = (e) => {
        const { value, checked } = e.target;
        if(checked){
            setGenre((prevGenre) => ( [...prevGenre, value] ));
        }else{
            setGenre((prevGenre) => prevGenre.filter((genre) => genre != value));
        }
    }

    const handleRating = (e) => {
        setRating(e.target.value);
    }

    const handlePrice = (e) => {
        setPrice( e.target.value );
    }

    const handleClear = () => {
        setRomanceChecked(false);
        setFantasyChecked(false);
        setMysteryChecked(false);
        setScienceChecked(false);
        setSelfHelpChecked(false);
        setGenre([]);
        setRating("");
        setPrice("");
    }

    const handleWishlist = async( bookId ) => {
      try{
        const response = await fetch(`https://pustak-bhandar-backend.vercel.app/books/update/${bookId}`, 
          {
            method:"POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({addedToWishlist:true}),
          }
       );

      if(!response.ok){
        throw "failed to update movie."
      }
      const data = await response.json();
      console.log("Added Movie", data);
      }
      catch(error){
        console.log("Error adding data", error);
      }
      toast.success("Item Added to wishlist");
    }

    const handleIncrement = async( bookId ) => {
        try{
        const response = await fetch(`https://pustak-bhandar-backend.vercel.app/books/updateIncrement/${bookId}`, 
        { method:"POST" }
        );

        toast.success("Item Added to cart");

        if(!response.ok){
          throw "failed to update Book."
        }
        const data = await response.json();
        console.log("Updated Book", data);
        }
        catch(error){
          console.log("Error updating data", error);
        }
    }

    const filteredByGenre = genre.length == 0 ?  data :  data?.filter((book) => genre.includes(book.genre) ) ;

    const filteredByRating = !rating ? filteredByGenre : filteredByGenre.filter((book) => book.rating >= rating );

    const sortedByPrice = price == "lowToHigh" ? filteredByRating?.sort((a,b) => a.price - b.price) : filteredByRating?.sort((a,b) => b.price - a.price) ;

    const filteredBySearch = !searchValue ? sortedByPrice : sortedByPrice.filter((book) => book.title == searchValue) ;

    console.log(filteredBySearch);


    return (
        <>
          <div>
               <ToastContainer position="top-right" autoClose={ 3000 }/>
          </div>

          <header>
            <div className="container py-4">

<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid px-0">
    <a class="navbar-brand" href="/" style={ { color:"red" } }>PustakBhandar</a>
    <button onClick={() => setIsMenuOpen(!isMenuOpen)} class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`} id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/userProfile">Profile</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/wishlist">Wishlist</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/cart">Cart</a>
        </li>
      </ul>
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={ (e) => setSearchValue(e.target.value) }/>
      </form>
    </div>
  </div>
</nav>

<hr />

            </div>
        </header>

          {/* <header className="container py-2">
           
          <div className="d-flex justify-content-between">
                <div>
                    <a href="/" className="navbar-brand fs-5">PustakBhandar</a>
                </div>

                <div>
                    <input type="text" placeholder="🔍︎  Search" className="form-control px-4" onChange={ (e) => setSearchValue(e.target.value) }/>
                </div>

                <div className="d-flex align-items-center">
                        <a href="/userProfile"  className="btn pe-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                            </svg>
                        </a>
                        <a href="/wishlist" className="btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                              <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                            </svg>
                            <span className="btn position-relative top-0 start-0 translate-middle badge rounded-pill bg-danger" style={{ fontSize: "0.65rem" }}>
                              { booksInwishlist?.length }
                            </span>
                        </a>
                        <a href="/cart" className="btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                            </svg>
                            <span className="btn position-relative top-0 start-0 translate-middle badge rounded-pill bg-danger" style={{ fontSize: "0.65rem" }}>
                              { booksIncart?.length }
                            </span>
                        </a>
                </div>
          </div>
          <hr />
          </header> */}

          <main className="mx-4">

            { loading ? <div className="container py-4"><h1>Loading...</h1></div> : 


            <div className="row">

                <div className="col-md-2 py-4 pe-4">
                    <div className="d-flex justify-content-between">
                        <h5 className="fw-bold">Filters</h5>
                        <p onClick={ handleClear } className="btn"><u>Clear</u></p> 
                    </div>
                    <br />

                    <h5 className="fw-bold">Genre</h5>
                    <div className="form-check">
                        <input type="checkBox" id="romance" value="romance" checked={ romanceChecked } className="form-check-input" onClick={ () => setRomanceChecked(!romanceChecked) } onChange={ handleGenre }/>
                        <label htmlFor="romance" className="form-check-label">Romance</label>
                    </div>
                    <div className="form-check">
                        <input type="checkBox" id="fantasy" value="fantasy" checked={ fantasyChecked } className="form-check-input" onClick={ () => setFantasyChecked(!fantasyChecked) } onChange={ handleGenre }/>
                        <label htmlFor="fantasy" className="form-check-label">Fantasy</label>
                    </div>
                    <div className="form-check">
                        <input type="checkBox" id="mystery" value="mystery" checked={ mystryChecked } className="form-check-input" onClick={ () => setMysteryChecked(!mystryChecked) } onChange={ handleGenre }/>
                        <label htmlFor="mystery" className="form-check-label">Mystery Thriller</label>
                    </div>
                    <div className="form-check">
                        <input type="checkBox" id="science" value="science" checked={ scienceChecked }  className="form-check-input" onClick={ () => setScienceChecked(!scienceChecked) } onChange={ handleGenre }/>
                        <label htmlFor="science" className="form-check-label">Science Fiction</label>
                    </div>
                    <div className="form-check">
                        <input type="checkBox" id="self-help" value="self-help" checked={ selfHelpChecked } className="form-check-input" onClick={ () => setSelfHelpChecked(!selfHelpChecked) } onChange={ handleGenre }/>
                        <label htmlFor="self-help" className="form-check-label">Self Help</label>
                    </div>
                    <br/>

                    <h5 className="fw-bold">Rating</h5>
                    <div className="form-check">
                        <input type="radio" id="4Star" name="rating" value="4"  className="form-check-input" onChange={ handleRating }/>
                        <label htmlFor="4Star" className="form-check-label">4 star & above</label>
                    </div>
                    <div className="form-check">
                        <input type="radio" id="3Star" name="rating" value="3" className="form-check-input" onChange={ handleRating } />
                        <label htmlFor="3Star" className="form-check-label">3 star & above</label>
                    </div>
                    <div className="form-check">
                        <input type="radio" id="2Star" name="rating" value="2" className="form-check-input" onChange={ handleRating } />
                        <label htmlFor="2Star" className="form-check-label">2 star & above</label>
                    </div>
                    <div className="form-check">
                        <input type="radio" id="1Star" name="rating" value="1" className="form-check-input" onChange={ handleRating } />
                        <label htmlFor="1Star" className="form-check-label">1 star & above</label>
                    </div>
                    <br />

                    <h5 className="fw-bold">Sort by</h5>
                    <div className="form-check">
                        <input type="radio" id="lowToHigh" name="priceSort" value="lowToHigh" className="form-check-input" onChange={ handlePrice }/>
                        <label htmlFor="lowToHigh" className="form-check-label">Price - Low to High</label>
                    </div>
                    <div className="form-check">
                        <input type="radio" id="highToLow" name="priceSort" value="highToLow" className="form-check-input" onChange={ handlePrice }/>
                        <label htmlFor="highToLow" className="form-check-label">Price - High to Low</label>
                    </div>
                </div>

                <div className="col-md-10">

                    <div className="p-4" style={ { background:"	#F0F0F0" } }>
                        

                        <span className="h4 fw-bold pb-4">Showing All Books</span>
                        <span>{` ( Showing ${ filteredByGenre?.length } books ) ` }</span>

                        

                        <div className="row">
                            {
                                filteredBySearch?.map((book) => (
                                    <div className="col-md-3" key={ book._id }>

                                        <div className="card my-4">
                                        
                                        <a href={ `/productDetails/${ book._id }` }>
                                        <img src={ book.imageUrl } alt="book" className="img-fluid" style={ { height:"200px", width:"450px" } }/>
                                        </a>

                                        <div className="card-body">
                                        <div className="d-flex flex-column align-items-center">
                                            <p>{ book.rating } { book.rating >= 5 ? `⭐⭐⭐⭐⭐` : book.rating >=4 ? `⭐⭐⭐⭐` : book.rating >= 3 ? `⭐⭐⭐` : book.rating >= 2 ? `⭐⭐` : `⭐` }</p>
                                            <p>{ book.title }</p>
                                            <h5 className="fw-bold">₹ { book.price }</h5>
                                        </div>
                                        </div>
                                        <button className="btn btn-primary w-100 rounded-0 mb-2" onClick={ () => handleIncrement( book._id ) }>Add to Cart</button>
                                        <button className="btn btn-secondary w-100 rounded-0" onClick={ () => handleWishlist(book._id) }>Add to Wishlist</button>
                                        </div>

                                    </div>
                                ))
                            }
                        </div>

                    </div>
                </div>

            </div>

            }


          </main>
          <Footer/>
        </>
    )
}

export default ProductListing;