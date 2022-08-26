import React from 'react';
import LogoTop from '../Assets/logo512.png';
import {Link, useParams} from "react-router-dom";


const Navbar = (props) => {

    const {id} = useParams();
    
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark shadow-5-strong">
                <div className="container">
                    <a className="navbar-brand" href="#">
                        <img src={LogoTop} width="30" height="30" className="d-inline-block align-top" alt="" />
                    </a>
                        <div className='topic-off'>
                            <p className = "topic">
                                {props.roomno}
                            </p>
                        </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto"  >
                            <li className="nav-item active">
                                <Link className="nav-link" to={`/${id}/services`} style={{ color: "white" }} > Services </Link>
                            </li>
                            <li className='nav-item active'>
                                <Link className="nav-link" to={`/${id}/callawaiter`} style={{ color: "white" }} > Call a waiter </Link>
                            </li>
                            <li className='nav-item active'>
                                <Link className="nav-link" to={`/${id}/drinks`} style={{ color: "white" }} > Dishes </Link>
                            </li>
                            <li className='nav-item active'>
                                <Link className="nav-link" to={`/${id}/login`} style={{ color: "white" }} > LogOut </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar