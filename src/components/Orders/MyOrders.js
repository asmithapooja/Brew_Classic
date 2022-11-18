import axios from 'axios';
import Footer from '../Footer/Footer';
import Loading from '../LoadingScreen/Loading';
import changeScreen from '../Action';
import React, { useState, useEffect } from 'react';
import Variables from '../Variables';
import CustomError from '../CustomError';
import Order from './src/Order';
import { Link, useParams } from "react-router-dom";
import Navbar from '../Navbar/Navbar';

const MyOrders = () => {

     // Retriving the ID
     const { id } = useParams();
     const splitedIds = id.split(/[-]/);

     // Authentication token
     const token = localStorage.getItem("token");

     // Loader
     const [loading, setLoading] = useState(false);

     // Retriving all the ordered data from the REST
     const [data, setData] = useState([]);

     const getData = () => {
          setLoading(true);
          const credentials = {
               roomId: splitedIds[1]
          }
          axios.post(`${Variables.host}/${splitedIds[1]}/userdishes`, credentials)
               .then(res => {
                    setData(res.data.message);
                    setLoading(false);
               })
               .catch(err => {
                    // Make the modal for the rest failure!
               })
     };

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

     useEffect(() => {
          getData();
     }, [])

     return (
          <div>
               <Navbar id={id} lodgeId={splitedIds[0]} roomId={splitedIds[1]} />
               {
                    loading ? (
                         <Loading alignOperator={"top-align-nav-present"} />
                    ) : (
                         token ? (
                              <div>
                                   <div className="topic text-center">
                                        My Orders!!!
                                   </div>
                                   <div className="myOrders-Space">
                                        {
                                             data.map((item, key) => {
                                                  return (
                                                       <Order dishname={item.dishName} delivered={item.delivered} quantity={item.quantity} timeOfOrder={item.time} />
                                                  )
                                             })
                                        }
                                   </div>
                                   <Footer lodgeId={splitedIds[0]} roomId={splitedIds[1]} />
                              </div>
                         ) : (
                              <CustomError id={id} />
                         )
                    )
               }
          </div>
     )
}

export default MyOrders