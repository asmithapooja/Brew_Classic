import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import Loading from '../../LoadingScreen/Loading';
import Navbar from '../../Navbar/Navbar'
import Variables from '../../Variables';
import Pagination from '../../Navbar-Pagination/src/Pagination';
import changeScreen from '../../Action';
import CustomError from '../../CustomError';


const Static = () => {

  // Getting the token from the local storage...
  const token = localStorage.getItem("token");

  // Loader
  const [loading, setLoading] = useState(false);

  // Retriving the ID
  const { id } = useParams();
  const splitedIds = id.split(/[-]/);

  // Retrieving the room number
  const [roomno, setRoomno] = useState();
  const getRoomNo = () => {
    setLoading(true);
    const roomid = {
      roomid : splitedIds[1]
    }
    axios.post(`${Variables.host}/${splitedIds}/roombyid`, roomid)
    .then(data => {
        console.log("Room no" ,data.data);
        setRoomno(data.data);
        setLoading(false);
    })
  }

  // Checking the expire time of the token...
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

  // Invoking getRoomNo function everytime this component loads...
  useEffect(() => {
    getRoomNo();
  }, [])

  return (
    <div>
      {
        loading ? (
          <Loading alignOperator = {"top-align"} />
        ) : (
          token ? (
            <div>
              <Navbar id={id} lodgeId = {splitedIds[0]} roomId = {splitedIds[1]} />
              <Pagination roomno = {roomno} />
            </div>
          ) : (
            <CustomError id={id} />
          )
        )
      }
    </div>
  )
}

export default Static