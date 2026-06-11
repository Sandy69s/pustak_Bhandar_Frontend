import Header from "../components/Header";
import Footer from "../components/Footer";
import { Form, useParams } from "react-router-dom";
import useFetch from "../../useFetch";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const ProductDetails = () => {

    const { productId } = useParams();

    const {data, loading, error} = useFetch(`https://pustak-bhandar-backend.vercel.app/books/${ productId }`);

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

      toast.success("book Added to wishlist");

      if(!response.ok){
        throw "failed to update movie."
      }
      const data = await response.json();
      console.log("Added Movie", data);
    }
    catch(error){
      console.log("Error adding data", error);
    }
    }

    const handleIncrement = async( bookId ) => {
        try{
        const response = await fetch(`https://pustak-bhandar-backend.vercel.app/books/updateIncrement/${bookId}`, 
        { method:"POST" }
        );

        toast.success("Book Added to Cart Successfully")

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

    console.log(data);


    return(
        <>
          <Header/>

          <div>
              <ToastContainer position="top-right" autoClose={ 3000 }/>
          </div>
          
          { loading ? <div className="container py-4"><h1>Loading...</h1></div> : 

          <main className="container" style={ { background: "#F0F0F0" } }>
            
            <div className="row">
                <div className="col-md-4 p-4">
                    <img src={ data?.imageUrl } alt="book" className="img-fluid" style={ { height:"260px", width:"450px" } }/>
                    <p className="btn btn-primary rounded-0 w-100 mt-4" onClick={ () => handleIncrement( data?._id ) }>Add to Cart</p>
                    <p className="btn btn-secondary rounded-0 w-100" onClick={ () => handleWishlist( data?._id ) }>Add to Wishlist</p>
                </div>
                <div className="col-md-8 p-4">
                    <h5 className="fw-bold">{ data?.detailedTitle }</h5>
                    <p>{ data?.rating } {  data?.rating >= 5 ? `⭐⭐⭐⭐⭐` : data?.rating >=4 ? `⭐⭐⭐⭐` : data?.rating >= 3 ? `⭐⭐⭐` : data?.rating >= 2 ? `⭐⭐` : `⭐` } </p>
                    <br />
                    <h5 className="fw-bold"> ₹ { data?.price }</h5>
                    <h6 className="fw-bold" style={ { color:"grey" } }> 20% off </h6>
                    <br />
                    <p><b>genre : </b>{ data?.genre }</p>
                    <p><b>author : </b>{ data?.author }</p>
                    <hr />
                    <h6 className="fw-bold">Description: </h6>
                    <p>{ data?.details }</p>
                </div>
            </div>

          </main>

          }

          <br />


          <Footer/>
        </>
    )
}

export default ProductDetails;