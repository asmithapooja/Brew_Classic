import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import changeScreen from './Action.js';
import CustomError from './CustomError';
import Pagination from './Navbar-Pagination/src/Pagination';
import Footer from './Footer';
import Navbar from './Navbar';
import Variables from './Variables';
import axios from 'axios';
import GlobalBar from './Global';


const Drinks = () => {

    const { id } = useParams();

    const splitedIds = id.split(/[-]/);

    const token = localStorage.getItem("token");

    console.log(splitedIds);

    const [dishdata, setDishdata] = useState([]);

    const [roomno, setRoomno] = useState();

    const getData = () => {
        const roomid = {
            roomid: splitedIds[1]
        }
        const categeory = {
            type: "Drinks"
        }
        //console.log(`${Variables.host}/${splitedIds}/roombyid`)
        axios.post(`${Variables.host}/${splitedIds[0]}/dishvaries`, categeory)
            .then(data => {
                setDishdata(data.data)
            })
        axios.post(`${Variables.host}/${splitedIds}/roombyid`, roomid)
            .then(data => {
                console.log("Room no" ,data.data);
                setRoomno(data.data);
            })
    }

    useEffect(() => {
        getData();
    }, [])

    const parseJwt = (token) => {
        try {
          return JSON.parse(atob(token.split(".")[1]));
        } catch (e) {
          return null;
        }
      };

    const AuthVerify = () => {
          const user = localStorage.getItem("token");
      
          if (user) {
            const decodedJwt = parseJwt(user);
      
            if (decodedJwt.exp * 1000 < Date.now()) {
              localStorage.clear();
              changeScreen(id);
            }
          }
    }


    useEffect(() => {
        const interval = setInterval(() => {
            AuthVerify();
        }, 9000)
        return () => clearInterval(interval)
    }, [])


    return (
        <div>
            {
                token ? (
                    <div className='page-container'>

                        <div className="content-wrapper">
                            <div className='container'>
                                <Navbar roomno={roomno} id = {id} />
                                <Pagination />
                                <div>
                                    <p className='topic text-center'>
                                        Cold and Beverages
                                    </p>
                                </div>
                                {
                                    dishdata.length == 0 ? (
                                        <div className='stock text-center'>
                                            No items in the list
                                        </div>
                                    ) : (
                                        dishdata.map((item, key) => {
                                            return (
                                                <GlobalBar key={key.key} dishname={item.dishName} dishrate={item.dishRate} dishtype={item.dishType} dishid={item._id} engaged={item.available} roomno={roomno} />
                                            )
                                        })
                                    )
                                }
                            </div>
                        </div>
                        <Footer />
                    </div>
                ) : (
                    <CustomError id = {id}/>
                )
            }
        </div>
    )
}

export default Drinks;