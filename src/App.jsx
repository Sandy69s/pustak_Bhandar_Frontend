import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Header from './components/Header';
import Footer from './components/Footer';

function App() {

  return (
    <>
      <Header/>
      <main className='container bg-light'>

        <div className='row pb-4'>

          <div className='col-md-2'>
            <img src="https://t3.ftcdn.net/jpg/11/90/85/58/240_F_1190855847_Xn2LNOZuCiBvvX6OAkjkxoDMnZVaDLqz.jpg" alt="book" className='img-fluid' style={ { width:"100%", height:"90%" } }/>
            <div className='d-flex justify-content-center'> <a href="/productListing" className='navbar-brand'>Romance</a> </div>
          </div>
          <div className='col-md-2'>
            <img src="https://t3.ftcdn.net/jpg/06/14/40/96/240_F_614409656_krtdG05aStl08qz0v96cSUEqm9MJ8MeK.jpg" alt="book" className='img-fluid' style={ { width:"100%", height:"90%" } }/>
            <div className='d-flex justify-content-center'> <a href="/productListing" className='navbar-brand'>Fantasy</a> </div>
          </div>
          <div className='col-md-2'>
            <img src="https://t3.ftcdn.net/jpg/16/14/66/16/240_F_1614661635_1gn9C4devpFtfizJ94jn4JFn653coPWH.jpg" alt="book" className='img-fluid' style={ { width:"100%", height:"90%" } }/>
            <div className='d-flex justify-content-center'> <a href="/productListing" className='navbar-brand'>Mystery</a> </div>
          </div>
          <div className='col-md-2'>
            <img src="https://images.unsplash.com/photo-1618590067824-5ba32ca76ce9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHRocmlsbGVyfGVufDB8fDB8fHww" alt="book" className='img-fluid' style={ { width:"100%", height:"90%" } }/>
            <div className='d-flex justify-content-center'> <a href="/productListing" className='navbar-brand'>Thriller</a> </div>
          </div>
          <div className='col-md-2'>
            <img src="https://t4.ftcdn.net/jpg/12/30/73/29/240_F_1230732921_KiWid6eNDteDdoyTF5xgyPoKlsJTfrUN.jpg" alt="book" className='img-fluid' style={ { width:"100%", height:"90%" } }/>
            <div className='d-flex justify-content-center'> <a href="/productListing" className='navbar-brand'>Science Fiction</a> </div>
          </div>
          <div className='col-md-2'>
            <img src="https://media.istockphoto.com/id/1460535745/photo/e-learning-graduate-certificate-program-concept-lightbulb-on-the-book-with-graduation-hat-and.webp?a=1&b=1&s=612x612&w=0&k=20&c=dgPi3xDpS8wchlLoqC-rYNv-2YPiqMgZaaHzsP-Jvqs=" alt="book" className='img-fluid' style={ { width:"100%", height:"90%" } }/>
            <div className='d-flex justify-content-center'> <a href="/productListing" className='navbar-brand'>Self Help</a> </div>
          </div>

        </div>

        <hr />

        <a href="/productListing">
          <div>
            <img src="https://plus.unsplash.com/premium_photo-1669652639356-f5cb1a086976?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Main Book image" className='img-fluid py-2' style={ { height:"100%", width:"100%" } }/>
        </div>
        </a>
        

        <div className='p-2 d-flex justify-content-between'>

          <div className='row py-4 me-2' style={ { background:"#D3D3D3" } } >
            <img src="https://images.unsplash.com/photo-1550399105-c4db5fb85c18?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG5vdmVsfGVufDB8fDB8fHww" alt="valentine" className='col-md-4 px-4' style={ { height:"130px" } }/>

            <div className='col-md-8 d-flex flex-column justify-content-between' >
              <p>NEW ARRIVALS</p>
              <div>
                <h4 className='fw-bold'>Latest Collection</h4>
                <p>Check out the latest collection of books to emjoy the reading.</p>
              </div>
            </div>
          </div>

          <div className='row py-4 ms-2' style={ { background:"#D3D3D3" } }>
            <img src="https://images.unsplash.com/photo-1550399105-c4db5fb85c18?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG5vdmVsfGVufDB8fDB8fHww" alt="valentine" className='col-md-4 px-4'style={ { height:"130px" } }/>

            <div className='col-md-8 d-flex flex-column justify-content-between' >
              <p>NEW ARRIVALS</p>
              <div>
                <h4 className='fw-bold'>Latest Collection</h4>
                <p>Check out the latest collection of books to emjoy the reading.</p>
              </div>
            </div>
          </div>

        </div>
      </main>
      <Footer/>
    </>
  )
}

export default App
