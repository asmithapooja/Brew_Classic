import React, {useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from "axios";
import Footer from './Footer';
import Navbar from './Navbar';
import GlobalBar from './Global';
import Variables from './Variables';
import { propTypes } from 'react-bootstrap/esm/Image';


const NonVeg = () => {

    const {id} = useParams();

    const splitedIds = id.split(/[-]/);

    console.log(splitedIds);

    const [dishdata, setDishdata] = useState([]);
    const [roomno, setRoomno] = useState();

    const getData = () => {
        const roomid = {
            roomid : splitedIds[1]
        }
        const categeory = {
            type : "Non-Veg"
        }
        axios.post(`${Variables.dishLodge}dishvaries`, categeory)
        .then(data => {
            setDishdata(data.data);
            console.log(dishdata.length);
        })
        axios.post(`${Variables.dishLodge}roombyid`, roomid)
            .then(data => {
                console.log(data.data);
                setRoomno(data.data);
            })
    }

    useEffect(() => {
        getData();
    },[])
  return (
    <div className='page-container'>

            <div className="content-wrapper">
                <div className='container'>
                    <Navbar roomno = {roomno} />
                    <div className='tabs'>
                        <ul class="nav nav-tabs">
                            <li class="nav-item">
                                <Link className="nav-link" to={`/${id}/drinks`}> Drinks </Link>
                            </li>
                            <li class="nav-item">
                                <Link className='nav-link highlight' to={`/${id}/nonveg`}> Non-Veg </Link>
                            </li>
                            <li class="nav-item">
                                <Link className='nav-link' to={`/${id}/veg`}> Veg </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <p className='topic'>
                            Non-Veg Dishes
                        </p>
                    </div>
                    {
                        dishdata.length == 0 ? (
                            <div className = "stock text-center">
                                No items in the list
                            </div>
                        ) : (
                            dishdata.map((item,key) => {
                            return(
                                <GlobalBar key = {key.key} dishname = {item.dishName} dishrate = {item.dishRate} dishtype = {item.dishType} dishid = {item._id} engaged = {item.available} roomno = {roomno} />
                            )
                        })
                        )
                    }
                </div>
            </div>
            <Footer />
        </div>
  )
}

export default NonVeg;