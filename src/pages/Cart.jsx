import Header from "../components/Header";
import useFetch from "../../useFetch";
import { useState } from "react";

const Cart = () => {

    const [ addressValue, setAddressValue ] = useState("");

    const {data, loading, error} = useFetch("https://pustak-bhandar-backend.vercel.app/books");

    const address = useFetch("https://pustak-bhandar-backend.vercel.app/address");

    console.log(address.data);

    const handleDecrement = async( bookId ) => {
        try{
        const response = await fetch(`http://localhost:3000/books/updateDecrement/${bookId}`, 
        { method:"POST" }
        );

        if(!response.ok){
          throw "failed to update Book."
        }
        const data = await response.json();
        console.log("Updated Book", data);

        window.location.reload();

        alert("Book quantity Decreased");
        }
        catch(error){
          console.log("Error updating data", error);
        }
    }

    const handleIncrement = async( bookId ) => {
        try{
        const response = await fetch(`http://localhost:3000/books/updateIncrement/${bookId}`, 
        { method:"POST" }
        );

        if(!response.ok){
          throw "failed to update Book."
        }
        const data = await response.json();
        console.log("Updated Book", data);

        window.location.reload();

        alert("Book quantity Increased");
        }
        catch(error){
          console.log("Error updating data", error);
        }
    }

    const handleWishlist = async( bookId ) => {
        try{
        const response = await fetch(`http://localhost:3000/books/update/${bookId}`, 
        {
          method:"POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({addedToWishlist:true}),
        }
        );

        alert("Book added to wishlist");

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
        const response = await fetch(`http://localhost:3000/books/updateQuantityToZero/${bookId}`, 
        { method:"POST" }
        );

        if(!response.ok){
          throw "failed to update Book."
        }
        const data = await response.json();
        console.log("Updated Book", data);

        window.location.reload();

        alert("Book removed from cart");
        }
        catch(error){
          console.log("Error updating data", error);
        }
    }

    const handleOrder = async( bookOrderDetails ) => {
        try{
        const response = await fetch(`https://pustak-bhandar-backend.vercel.app/bookOrder`, 
        {
          method:"POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(bookOrderDetails),
        }
        );

        alert("Order Placed Successfully");

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



    const filteredBooks = data?.filter((book) => ( book.quantity > 0 ));

    return (
        <>
          <Header/>
          <main className="container">

            {loading ? <div className="container"><h1>Loading.....̼͙̈́͆̈́ͯ̒̆̀̓ͧ͠𒀱</h1></div> : 

            <div>

                <h5 className="fw-bold pb-4"> My Cart </h5>

            <div>
                {
                    filteredBooks?.map((book) => (
                        <div className="p-4 mb-4" style={ { background:"#F0F0F0" } }>
                        <div className="row">
                            <div className="col-md-8">
                                <div className="card">
                                    <div className="row">
                                        <div className="col-md-5">
                                            <img src={ book?.imageUrl } alt="book Image" className="img-fluid"/>
                                        </div>
                                        <div className="col-md-7 pe-4 pt-2">
                                            <p>{ book?.title }</p>
                                            <h5 className="fw-bold">₹ { book?.price }</h5>
                                            <h5 className="fw-bold" style={ { color:"#B0B0B0" } }>50% off</h5>
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
                            <div className="col-md-4">
                                <div className="card px-4 py-2">
                                    <h5 className="fw-bold">Price Details</h5>
                                    <hr />
                                    <div className="d-flex justify-content-between">
                                        <p>Price</p>
                                        <p>₹{ book?.price }</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <p>Quantity</p>
                                        <p>{ book?.quantity }</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <p>Discount</p>
                                        <p>₹{ (book?.price) * book?.quantity * 0.5 }</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <p>Delivery Charges</p>
                                        <p>₹{ 200 }</p>
                                    </div>
                                    <hr />
                                    <div className="d-flex justify-content-between">
                                        <h5 className="fw-bold">Total Amount</h5>
                                        <h5 className="fw-bold">₹{ (book?.price  * book?.quantity) + 200 - (book?.price * book?.quantity * 0.5) }</h5>
                                    </div>
                                    <hr />
                                    <p> You will save { book?.price * book?.quantity * 0.5 } on this order </p>
                                    <div>
                                        <select name="address" id="address" className="form-control" onChange={ (e) => setAddressValue(e.target.value) }>
                                            <option value=""> Select address </option>
                                            {
                                                address?.data?.map((address) => (
                                                    <option value={ address.address }>{ address.address }</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <button className="btn btn-primary mt-4" onClick={ () => handleOrder({ title:book.title, price:book.price, quantity:book.quantity, address:addressValue }) }>Place Order</button>
                                </div>
                            </div>
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

export default Cart;