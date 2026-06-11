import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";
import useFetch from "../../useFetch";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserProfile = () => {

    const [houseNo, setHouseNo] = useState("");
    const [area, setArea] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");



    const { data, loading, error } = useFetch( "https://pustak-bhandar-backend.vercel.app/address" );

    const bookOrders = useFetch("https://pustak-bhandar-backend.vercel.app/bookOrders");


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

    const addAddress = async() => {
      try{
        const response = await fetch(`https://pustak-bhandar-backend.vercel.app/address`, 
          {
            method:"POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
                houseNo:houseNo,
                area:area,
                street:street,
                city:city,
                state:state,
            }),
          }
       );

      if(!response.ok){
        throw "failed to add address."
      }
      const data = await response.json();
      console.log("Added address", data);
      }
      catch(error){
        console.log("Error adding address", error);
      }
    }



    return(
        <>
        <Header/>

        <div>
               <ToastContainer position="top-right" autoClose={ 3000 }/>
          </div>

        <main className="container">

            <h5 className="fw-bold py-4">User Details</h5>

            <div className="py-4 mb-4" style={ { background:"#F0F0F0" } }>
                <div className="row">

                    <div className="col-md-6">
                        <div className="card p-4 my-4 mx-4">
                            <div className="row">
                                <b className="col-md-5"> First Name: </b>
                                <p className="col-md-7"> Sandeep </p>
                            </div>
                            <div className="row">
                               <b className="col-md-5">Last Name: </b>
                               <p className="col-md-7">Solanki </p>
                            </div>
                            <div className="row">
                               <b className="col-md-5">Gender: </b>
                               <p className="col-md-7">Male </p>
                            </div>
                            <div className="row">
                               <b className="col-md-5">Email: </b>
                               <p className="col-md-7"> sandeep@gmail.com </p>
                            </div>
                            <div className="row">
                               <b className="col-md-5">Phone Number: </b>
                               <p className="col-md-7">+91-1234567890 </p>
                            </div>
                            <div className="row">
                               <b className="col-md-5">Alternate Number: </b>
                               <p className="col-md-7">+91-1234567890 </p>
                            </div>
                            <div className="row">
                               <b className="col-md-5">Account Detail: </b>
                               <p className="col-md-7">XXXXXXX0101 </p>
                            </div>
                            <div className="row">
                               <b className="col-md-5">Adhar Number: </b>
                               <p className="col-md-7">XXXXXXX0101 </p>
                            </div>
                            <br />
                            <br />
                            <br />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="card p-4 my-4 mx-4">
                            <form action="" className="form-group">
                                <p className="fw-bold">New Address</p>
                                <input type="text"  placeholder="Enter house number" className="form-control mb-4" onChange={ (e) => setHouseNo(e.target.value) }/>
                                <input type="text"  placeholder="Enter Area" className="form-control mb-4" onChange={ (e) => setArea(e.target.value) }/>
                                <input type="text"  placeholder="Enter Street" className="form-control mb-4" onChange={ (e) => setStreet(e.target.value) }/>
                                <input type="text"  placeholder="Enter City" className="form-control mb-4" onChange={ (e) => setCity(e.target.value) }/>

                                <select name="state" id="state" className="form-control mb-4" onChange={ (e) => setState(e.target.value) }>
                                   <option value="">Select State</option>
                                   <option value="Madhya Pradesh">Madhya Pradesh</option>
                                   <option value="Maharashtra">Maharashtra</option>
                                   <option value="Gujrat">Gujrat</option>
                                </select>

                                <button className="btn btn-primary w-100"  onClick={ addAddress }>Add New Address</button>
                            </form>
                        </div>
                    </div>

                </div>

                <div className="px-4 py-0">
                    <hr />
                </div>

                <div className="row">
                    {
                        data?.map((address) => (
                            <div className="col-md-4" key={ address?._id }>
                                <div className="card p-4 my-2 mx-4 justify-content-between">
                                    <div className="card-body">
                                        <div className="pb-4">
                                            <b className="mb-4">Address...</b>
                                        </div>
                                        <div className="row">
                                            <b className="col-md-4">house: </b>
                                            <p className="col-md-8"> { address.houseNo } </p>
                                        </div>
                                        <div className="row">
                                            <b className="col-md-4">area: </b>
                                            <p className="col-md-8"> { address.area } </p>
                                        </div>
                                        <div className="row">
                                            <b className="col-md-4">street: </b>
                                            <p className="col-md-8"> { address.street } </p>
                                        </div>
                                        <div className="row">
                                            <b className="col-md-4">city: </b>
                                            <p className="col-md-8"> {address.city} </p>
                                        </div>
                                        <div className="row">
                                            <b className="col-md-4">state: </b>
                                            <p className="col-md-8"> { address.state } </p>
                                        </div>
                                    </div>
                                    <div>
                                        <button className="btn btn-secondary w-100" onClick={ () => handleDelete( address?._id ) }>Delete</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>

            </div>


            <h5 className="fw-bold py-4">Order History</h5>

            <div className="py-4" style={ { background:"#F0F0F0" } }>
                {
                    bookOrders?.data?.map((book) => (
                        <div className="card p-4 m-4">
                            <div className="row">
                                <b className="col-md-4">Ordered books: </b>
                                <p className="col-md-8">{ book.title }</p>
                            </div>
                            <div className="row">
                                <b className="col-md-4">Order Address: </b>
                                <p className="col-md-8">{ book.address }</p>
                            </div>
                            <div className="row">
                                <b className="col-md-4">Order Date: </b>
                                <p className="col-md-8">{ book.quantity }</p>
                            </div>
                            <div className="row">
                                <b className="col-md-4">Total Price: </b>
                                <p className="col-md-8">₹{ book.price }</p>
                            </div>
                        </div>
                    ))
                }
            </div>

        </main>

        <Footer/>
        </>
    )
}

export default UserProfile;