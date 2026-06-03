import Header from "../components/Header";
import useFetch from "../../useFetch";

const Wishlist = () => {

    const {data, loading, error} = useFetch("https://pustak-bhandar-backend.vercel.app/books");

    const handleRemove = async( bookId ) => {
        try{
        const response = await fetch(`https://pustak-bhandar-backend.vercel.app/books/update/${bookId}`, 
        {
          method:"POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({addedToWishlist:false})
        }
      );

      if(!response.ok){
        throw "failed to update Book."
      }
      const data = await response.json();
      console.log("Updated Book", data);

      window.location.reload();
      alert("Book removed from wishlist");
    }
    catch(error){
      console.log("Error updating data", error);
    }
    }

    const handleIncrement = async( bookId ) => {
        try{
        const response = await fetch(`https://pustak-bhandar-backend.vercel.app/books/updateIncrement/${bookId}`, 
        { method:"POST" }
        );

        alert("Book added to Cart")

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

    const filteredBooks = data?.filter((book) => book.addedToWishlist);


    return(
        <>
          <Header/>
          <main className="container">

            { loading ? <div className="container p-4"><h1>Loading.....̼͙̈́͆̈́ͯ̒̆̀̓ͧ͠𒀱</h1></div> :

            <div>
            <div>
                <h4 className="fw-bold pb-4">My Wishlist</h4>
            </div>

            <div className="row">
                {
                    filteredBooks?.map((book) => (
                        <div className="col-md-3 pb-4" key={ book?._id }>
                            <div className="card">
                                <a href={ `/productDetails/${ book._id }` }>
                                    <img src={ book?.imageUrl } alt="book image" className="img-fluid"/>
                                </a>
                                <div className="card-body">
                                    <div className="d-flex flex-column align-items-center">
                                        <p>{ book.rating } { book.rating >= 5 ? `⭐⭐⭐⭐⭐` : book.rating >=4 ? `⭐⭐⭐⭐` : book.rating >= 3 ? `⭐⭐⭐` : book.rating >= 2 ? `⭐⭐` : `⭐` }</p>
                                        <p>{ book?.title }</p>
                                        <h5 className="fw-bold">₹ { book?.price }</h5>
                                    </div>
                                </div>
                                <button className="btn btn-primary rounded-0 mb-2" onClick={ () => handleIncrement( book?._id ) }>Add to Cart</button>
                                <button className="btn btn-secondary rounded-0" onClick={ () => handleRemove( book?._id ) }>Remove from Wishlist</button>
                            </div>
                        </div>
                    ))
                }
            </div>
            </div>}
          </main>
        </>
    )
}

export default Wishlist;