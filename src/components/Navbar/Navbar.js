import React, {useState, useEffect} from 'react';
import axios from "axios";
import Variables from '../Variables';
import LogoTop from '../../Assets/logo512.png';
import {Link, useParams} from "react-router-dom";


const Navbar = (props) => {


    // Get an ID from the URL through props

    const lodgeID = props.lodgeID ;
    const roomId =  props.roomId;


  // Retrieving the room number
  const [roomno, setRoomno] = useState();
  const getRoomNo = () => {
    const roomid = {
      roomid : roomId
    }
    axios.post(`${Variables.host}/${roomId}/roombyid`, roomid)
    .then(data => {
        console.log("Room no" ,data.data);
        setRoomno(data.data);
    })
  };

  useEffect(() => {
    getRoomNo();
  }, [])
    
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark shadow-5-strong">
                <div className="container">
                    <a className="navbar-brand" href="#">
                        <img src={LogoTop} width="30" height="30" className="d-inline-block align-top" alt="" />
                    </a>
                        <div className='topic-off'>
                            <p className = "topic">
                                {roomno}
                            </p>
                        </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto"  >
                            <li className="nav-item active">
                                <Link className="nav-link" to={`/${props.id}/myorders`} style={{ color: "white" }} > My Orders </Link>
                            </li>
                            <li className='nav-item active'>
                                <Link className="nav-link" to={`/${props.id}/callwaiter`} style={{ color: "white" }} > Call a waiter </Link>
                            </li>
                            <li className='nav-item active'>
                                <Link className="nav-link" to={`/${props.id}/static`} style={{ color: "white" }} > Dishes </Link>
                            </li>
                            <li className='nav-item active'>
                                <Link className="nav-link" to={`/${props.id}/login`} style={{ color: "white" }} > LogOut </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar