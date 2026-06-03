

const Header = () => {
    return (
        <header className="container py-2">
            <div className="d-flex justify-content-between">

                <div>
                    <a href="/" className="navbar-brand fs-5">PustakBhandar</a>
                </div>

                <div>
                    <input type="text" placeholder="🔍︎  Search" className="form-control px-4" />
                </div>

                <div className="d-flex align-items-center">
                        <a href="/userProfile" className="navbar-brand"><h4>👤</h4></a>
                        <a href="/wishlist" className="navbar-brand px-4" style={ { color:"grey" } }><h2>♡</h2></a>
                        <a href="/cart" className="navbar-brand" ><h3>🛒</h3></a>
                </div>

            </div>
            <hr />
        </header>
    )
}

export default Header;