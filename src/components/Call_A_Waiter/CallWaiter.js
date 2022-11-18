import axios from 'axios';
import React, {useEffect} from 'react'
import changeScreen from '../Action.js';
import Navbar from '../Navbar/Navbar.js';
import CustomError from '../CustomError.js';
import Variables from '../Variables.js';
import { Link, useParams } from "react-router-dom";

const CallWaiter = () => {

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
                        <Navbar id={id} lodgeId = {splitedIds[0]} roomId = {splitedIds[1]} />
                        <div className = "container">
                            Still in development
                        </div>
                    </div>
                ) : (
                    <CustomError id={id} />
                )
            }
        </div>
    )
}

export default CallWaiter;
