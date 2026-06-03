import Header from "../components/Header";
import useFetch from "../../useFetch";
import { useState } from "react";

const ProductListing = () => {

    const { data, loading, error } = useFetch("https://pustak-bhandar-backend.vercel.app/books");

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
      alert("Item Added to wishlist");
    }

    const handleIncrement = async( bookId ) => {
        try{
        const response = await fetch(`https://pustak-bhandar-backend.vercel.app/books/updateIncrement/${bookId}`, 
        { method:"POST" }
        );

        alert("Item Added to cart");

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
          <div className="container py-2">
          <div className="d-flex justify-content-between">
                <div>
                    <a href="/" className="navbar-brand fs-5">PustakBhandar</a>
                </div>

                <div>
                    <input type="text" placeholder="🔍︎  Search" className="form-control px-4" onChange={ (e) => setSearchValue(e.target.value) }/>
                </div>

                <div className="d-flex align-items-center">
                        <a href="/userProfile" className="navbar-brand"><h4>👤</h4></a>
                        <a href="/wishlist" className="navbar-brand px-4" style={ { color:"grey" } }><h2>♡</h2></a>
                        <a href="/cart" className="navbar-brand" ><h3>🛒</h3></a>
                </div>
          </div>
          <hr />
          </div>

          <main className="mx-4">
            <div className="row">

                <div className="col-md-3 py-4 pe-4">
                    <div className="d-flex justify-content-between">
                        <h5 className="fw-bold">Filters</h5>
                        <p onClick={ handleClear }><u>Clear</u></p> 
                    </div>
                    <br />

                    <h5 className="fw-bold">Genre</h5>
                    <div className="form-check">
                        <input type="checkBox" id="romance" value="romance" checked={ romanceChecked } className="form-check-input" onClick={ () => setRomanceChecked(!romanceChecked) } onChange={ handleGenre }/>
                        <label htmlFor="romance" className="form-check-label">Romance Genre</label>
                    </div>
                    <div className="form-check">
                        <input type="checkBox" id="fantasy" value="fantasy" checked={ fantasyChecked } className="form-check-input" onClick={ () => setFantasyChecked(!fantasyChecked) } onChange={ handleGenre }/>
                        <label htmlFor="fantasy" className="form-check-label">Fantasy Genre</label>
                    </div>
                    <div className="form-check">
                        <input type="checkBox" id="mystery" value="mystery" checked={ mystryChecked } className="form-check-input" onClick={ () => setMysteryChecked(!mystryChecked) } onChange={ handleGenre }/>
                        <label htmlFor="mystery" className="form-check-label">Mystery Thriller Genre</label>
                    </div>
                    <div className="form-check">
                        <input type="checkBox" id="science" value="science" checked={ scienceChecked }  className="form-check-input" onClick={ () => setScienceChecked(!scienceChecked) } onChange={ handleGenre }/>
                        <label htmlFor="science" className="form-check-label">Science Fiction Genre</label>
                    </div>
                    <div className="form-check">
                        <input type="checkBox" id="self-help" value="self-help" checked={ selfHelpChecked } className="form-check-input" onClick={ () => setSelfHelpChecked(!selfHelpChecked) } onChange={ handleGenre }/>
                        <label htmlFor="self-help" className="form-check-label">Self Help Genre</label>
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

                <div className="col-md-9">

                    { loading ? <div className="container p-4"><h1>Loading.....̼͙̈́͆̈́ͯ̒̆̀̓ͧ͠𒀱</h1></div> :

                    <div className="p-4" style={ { background:"	#F0F0F0" } }>
                        

                        <span className="h4 fw-bold pb-4">Showing All Books</span>
                        <span>{` ( Showing ${ filteredByGenre?.length } books ) ` }</span>

                        

                        <div className="row">
                            {
                                filteredBySearch?.map((book) => (
                                    <div className="col-md-3" key={ book._id }>

                                        <div className="card my-4">
                                        
                                        <a href={ `/productDetails/${ book._id }` }>
                                        <img src={ book.imageUrl } alt="book" className="img-fluid"/>
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

                    </div>}
                </div>

            </div>
          </main>
        </>
    )
}

export default ProductListing;