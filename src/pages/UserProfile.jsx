import Header from "../components/Header";
import { useState } from "react";
import useFetch from "../../useFetch";

const UserProfile = () => {

    const [ address, setAddress ] = useState("");

    const { data, loading, error } = useFetch( "https://pustak-bhandar-backend.vercel.app/address" );

    const bookOrders = useFetch("https://pustak-bhandar-backend.vercel.app/bookOrders");

    const handleAddress = async() => {
      try{
        const response = await fetch(`https://pustak-bhandar-backend.vercel.app/address`, 
          {
            method:"POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
                address:address
            }),
          }
       );

       window.location.reload();

      if(!response.ok){
        throw "failed to add address."
      }
      const data = await response.json();
      console.log("Added Address", data);
      }
      catch(error){
        console.log("Error adding data", error);
      }
    }

    const handleDelete = async( addressId ) => {
      try{
        const response = await fetch(`https://pustak-bhandar-backend.vercel.app/address/${ addressId }`, 
          {
            method:"DELETE",
          }
       );

       window.location.reload();

      if(!response.ok){
        throw "failed to delete address."
      }
      const data = await response.json();
      console.log("deleted Address", data);
      }
      catch(error){
        console.log("Error deleting data", error);
      }
    }

    return(
        <>
        <Header/>
        <main className="container pb-4" style={ { background:"#F0F0F0" } }>
            <h5 className="fw-bold px-4 pt-4">User Details</h5>
            <div className="col-md-8">
                <div className="card m-4 p-4">
                  <div className="row">
                      <b className="col-md-4">Name: </b>
                      <p className="col-md-8"> Sandeep Solanki </p>
                  </div>
                  <div className="row">
                      <b className="col-md-4">Email: </b>
                      <p className="col-md-8"> sandeep@gmail.com </p>
                  </div>
                  <div className="row">
                      <b className="col-md-4">Phone Number: </b>
                      <p className="col-md-8">+91-1234567890 </p>
                  </div>
                  {
                    data?.map((address) => (
                        <div className="row">
                            <b className="col-md-4">Address: <button className="btn btn-outline-secondary ms-2 py-0" onClick={ () => handleDelete(address?._id) }>delete</button></b>
                            <p className="col-md-8">{ address.address }</p>
                        </div>
                    ))
                  }
                  <hr />
                  <div>
                    <div className="mb-4">
                        <input type="text" placeholder="Enter new Address" className="form-control" onChange={ (e) => setAddress(e.target.value) }/>
                    </div>
                    <div>
                        <button className="btn btn-secondary w-100" onClick={ handleAddress }> Add new Address </button>
                    </div>
                  </div>
                </div>
            </div>
            <hr />
            <h5 className="fw-bold p-4">Order History</h5>
            <div className="col-md-8" >
                <div className="card mx-4 px-4 py-4">
                <div>
                    {
                        bookOrders?.data?.map((book) => (
                            <div className="row">
                                <h5 className="fw-bold my-4">{ book.title }</h5>
                                <b className="col-md-4">Order Address:</b>
                                <p className="col-md-8">{ book.address } </p>
                                <b className="col-md-4">Price:</b>
                                <p className="col-md-8">{ book.price } </p>
                                <b className="col-md-4">Quantity:</b>
                                <p className="col-md-8">{ book.quantity } </p>
                                <b className="col-md-4">Total Price:</b>
                                <p className="col-md-8">{ (book.price * book.quantity) + 200 - ( book.price * book.quantity * 0.5 ) } </p>
                                <hr />
                            </div>
                        ))
                    }
                </div>
            </div>
            </div>
        </main>
        </>
    )
}

export default UserProfile;