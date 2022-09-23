import axios from 'axios';
import React, {useEffect} from 'react'
import changeScreen from './Action.js';
import Navbar from './Navbar';
import CustomError from './CustomError';
import Variables from './Variables';
import { Link, useParams } from "react-router-dom";

export const CallWaiter = () => {

    const { id } = useParams();

    const splitedIds = id.split(/[-]/);


    const token = localStorage.getItem("token");


    const current = new Date();

    const processData = () => {
        const credentials = {
            callawaiter: "Yes",
            time: current.toUTCString(),
            roomid: splitedIds[0]
        }
        axios.post(`${Variables.dishLodge}callawaiter`, credentials)
            .then(data => {
                if (data.data == true) {
                    alert("Service will be on your door soon!")
                } else {
                    alert("Error occured, please contact the receptionist!")
                }
            })
    }

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
                                Call A Waiter
                            </p>
                            <small>
                                You can expect services from the Waiter within 10 mins of calling a waiter!
                            </small>
                            <div className="smallText">
                                <button type="button" className="btn btn-outline-primary" onClick={processData}>
                                    Call A Waiter
                                </button>
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
