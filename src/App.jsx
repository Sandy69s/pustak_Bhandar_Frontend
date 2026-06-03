import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Header from './components/Header';

function App() {

  return (
    <>
      <Header/>
      <main className='container bg-light'>
        <div className='d-flex justify-content-between pb-4'>

          <div>
            <img src="https://placehold.co/210x150" alt="book" className='img-fluid'/>
            <div className='d-flex justify-content-center'> <a href="/productListing" className='navbar-brand'>Romance</a> </div>
          </div>
          <div>
            <img src="https://placehold.co/210x150" alt="book" className='img-fluid'/>
            <div className='d-flex justify-content-center'> <a href="/productListing" className='navbar-brand'>Fantasy</a> </div>
          </div>
          <div>
            <img src="https://placehold.co/210x150" alt="book" className='img-fluid'/>
            <div className='d-flex justify-content-center'> <a href="/productListing" className='navbar-brand'>Mystery & Thriller</a> </div>
          </div>
          <div>
            <img src="https://placehold.co/210x150" alt="book" className='img-fluid'/>
            <div className='d-flex justify-content-center'> <a href="/productListing" className='navbar-brand'>Science Fiction</a> </div>
          </div>
          <div>
            <img src="https://placehold.co/210x150" alt="book" className='img-fluid'/>
            <div className='d-flex justify-content-center'> <a href="/productListing" className='navbar-brand'>Self Help</a> </div>
          </div>

        </div>

        <a href="/productListing">
          <div>
            <img src="https://placehold.co/1200x500/D3D3D3/D3D3D3" alt="Main Book image" className='img-fluid py-2'/>
        </div>
        </a>
        

        <div className='py-4 d-flex justify-content-between'>

          <div className='row py-4 me-2' style={ { background:"#D3D3D3" } } >
            <img src="https://placehold.co/200x200/white/white" alt="valentine" className='col-md-4 px-4'/>

            <div className='col-md-8 d-flex flex-column justify-content-between' >
              <p>NEW ARRIVALS</p>
              <div>
                <h4 className='fw-bold'>Latest Collection</h4>
                <p>Check out the latest collection of books to emjoy the reading.</p>
              </div>
            </div>
          </div>

          <div className='row py-4 ms-2' style={ { background:"#D3D3D3" } }>
            <img src="https://placehold.co/200x200/white/white" alt="valentine" className='col-md-4 px-4'/>

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
    </>
  )
}

export default App
