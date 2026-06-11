import Header from "../components/Header";
import Footer from "../components/Footer";
import useFetch from "../../useFetch";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {

    const [ newAddress, setNewAddress ] = useState("");

    const {data, loading, error} = useFetch("https://pustak-bhandar-backend.vercel.app/books");

    const address = useFetch("https://pustak-bhandar-backend.vercel.app/address");

    const handleDecrement = async( bookId ) => {
        try{
        const response = await fetch(`https://pustak-bhandar-backend.vercel.app/books/updateDecrement/${bookId}`, 
        { method:"POST" }
        );

        if(!response.ok){
          throw "failed to update Book."
        }
        const data = await response.json();
        console.log("Updated Book", data);

        window.location.reload();

        toast.success("Book quantity Decreased");
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

        if(!response.ok){
          throw "failed to update Book."
        }
        const data = await response.json();
        console.log("Updated Book", data);

        window.location.reload();

        toast.success("Book quantity Increased");
        }
        catch(error){
          console.log("Error updating data", error);
        }
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

        toast.success("Book added to wishlist");

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

    const handleRemoveFromCart = async( bookId ) => {
        try{
        const response = await fetch(`https://pustak-bhandar-backend.vercel.app/books/updateQuantityToZero/${bookId}`, 
        { method:"POST" }
        );

        if(!response.ok){
          throw "failed to update Book."
        }
        const data = await response.json();
        console.log("Updated Book", data);

        window.location.reload();

        toast.success("Book removed from cart");
        }
        catch(error){
          console.log("Error updating data", error);
        }
    }

    const filteredBooks = data?.filter((book) => ( book.quantity > 0 ));

    const totalPrice = filteredBooks?.reduce((acc, curr) => {
        return acc + (curr.quantity * curr.price);
    }, 0);

    const titles = filteredBooks?.map((book) => (book.title));

    console.log(titles);

    const handleOrder = async() => {
        try{
        const response = await fetch(`https://pustak-bhandar-backend.vercel.app/bookOrder`, 
        {
          method:"POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            title:titles.join(", "),
            price:totalPrice,
            quantity:new Date().toLocaleDateString(),
            address:newAddress,
          }),
        }
        );

        if(newAddress){
            toast.success("Order placed successfully");
        }else{
            toast.error("please select any address");
        }

        if(!response.ok){
          throw "failed to Add bookOrder."
        }
        const data = await response.json();
        console.log("Added BookOrder", data);
        }
        catch(error){
        console.log("Error adding data", error);
        }
    }


    return (
        <>
          <Header/>

          <div>
              <ToastContainer position="top-right" autoClose={ 3000 }/>
          </div>

          <main className="container">
            <h5 className="fw-bold pb-4"> My Cart </h5>
            <div style={ { background:"#F0F0F0" } }>

                <div className="row">
                <div className="col-md-8">
                    {
                        filteredBooks?.map((book) => (
                            <div>
                                <div className="">
                                <div className="card p-4 m-4">
                                    <div className="row">
                                        <div className="col-md-5 p-2">
                                            <img src={ book?.imageUrl } alt="book Image" className="img-fluid" style={ { height:"255px", width:"400px" } }/>
                                        </div>
                                        <div className="col-md-7 p-2">
                                            <p>{ book?.title }</p>
                                            <h5 className="fw-bold">₹ { book?.price }</h5>
                                            <h5 className="fw-bold" style={ { color:"#B0B0B0" } }>20% off</h5>
                                            <div>
                                                <span>Quantity: </span>
                                                <button className="btn py-2 px-3" onClick={ () => handleDecrement(book._id) }>-</button>
                                                <button className="btn py-0 px-0">{ book?.quantity }</button>
                                                <button className="btn py-2 px-3" onClick={ () => handleIncrement(book._id) }>+</button>
                                            </div>
                                            <br />
                                            <button className="btn btn-outline-secondary w-100 rounded-0 mb-2" onClick={ () => handleRemoveFromCart( book?._id ) }>Remove from Cart</button>
                                            <br />
                                            <button type="button" className="btn btn-secondary w-100 rounded-0" onClick={ () => handleWishlist( book?._id ) }>Add to Wishlist</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        ))
                    }
                </div>

                <div className="col-md-4">
                    <div className="card p-4 m-4">

                        <h5 className="fw-bold">Price Details</h5>
                        <hr />

                        {
                          filteredBooks?.map((book) => (
                            <div>
                                    <div className="py-4">
                                        <b>{ book?.title }</b>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <p>Price</p>
                                        <p>₹{ book?.price }</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <p>Quantity</p>
                                        <p>{ book?.quantity }</p>
                                    </div>
                                    <hr />
                            </div>
                          ))
                        }

                        <div>
                            <div className="d-flex justify-content-between">
                                <p>calculated price</p>
                                <p>₹{ totalPrice }</p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <p>discount</p>
                                <p>₹{ Math.floor(totalPrice * 0.2) }</p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <p>delivry Charge</p>
                                <p>₹200</p>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between">
                                <h5 className="fw-bold">Total Amount</h5>
                                <h5 className="fw-bold">₹{ (totalPrice ) + 200 - Math.floor(totalPrice * 0.2) }</h5>
                            </div>
                            <hr />
                            <div>
                                <select name="address" id="address" className="form-select my-4" onChange={ (e) => setNewAddress(e.target.value) } >
                                    <option value=""> Select address </option>
                                    {
                                        address?.data?.map((address) => (
                                            <option value={ address.houseNo + ", " + address.area + ", " + address.street + ",  " + address.city + ", " + address.state }>{ ` ${ address.houseNo }, ${ address.area }, ${ address.street }, ${ address.city }, ${ address.state } ` }</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <button className="btn btn-primary w-100" onClick={ handleOrder }>Place Order</button>
                        </div>

                    </div>
                </div>

                </div>

            </div>
          </main>

          <Footer/>
        </>
    )
}

export default Cart;