import React from 'react'
import "./Header.css"
import {
    Navbar,
    NavbarBrand
} from 'reactstrap';

const Header = () => {
    return (
        <div>
            <Navbar color="dark" className="Nav">
                <NavbarBrand href="/">
                    BIT NOTIFY
                </NavbarBrand>
            </Navbar>
        </div>
    )
}

export default Header
