import React, { useState, useEffect } from 'react'
import Navbar from './Navbar';
import changeScreen from './Action.js';
import CustomError from './CustomError';
import axios from "axios";
import Variables from './Variables';
import { Link, useParams } from "react-router-dom";


const Service = () => {

    const { id } = useParams();

    const splitedIds = id.split(/[-]/);

    const token = localStorage.getItem("token");


    const [services, setServices] = useState([]);

    const [selectedservice, setSelectedservice] = useState();

    const selectedServices = () => {
        const credentials = {
            servicetype: selectedservice,
            roomId: splitedIds[1]
        }
        if (selectedservice == null || undefined) {
            alert("Please select any services!")
        } else {
            axios.post(`${Variables.dishLodge}addserviceroom`, credentials)
                .then(data => {
                    if (data.data == true) {
                        alert("Our waiter will be on service soon!")
                    } else {
                        alert("Error occured, please check with the receptionist1")
                    }
                })
        }
    }

    const getData = async () => {
        try {
            axios.post(`${Variables.dishLodge}servicelodge`)
                .then(data => {
                    console.log(data.data);
                    setServices(data.data)
                })
        } catch (err) {
            console.log(err);
            alert("Error occured, please check your internet connectivity!")
        }
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
                    <div>
                        <Navbar />
                        <div className='container text-center serviceBox'>
                            <p className='topic'>
                                Services We Offer
                            </p>
                            <div>
                                <select value={selectedservice} onChange={((e) => setSelectedservice(e.target.value))}>
                                    {
                                        services.map((item, key) => {
                                            return (
                                                <option>
                                                    {item.serviceType}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='main-footer text-center'>
                                <div className="container">
                                    <button type="button" className='btn btn-outline-info' onClick={selectedServices}>
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <CustomError id={id} />
                )
            }
        </div>
    )
}

export default Service