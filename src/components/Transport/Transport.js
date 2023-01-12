import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Loading from '../LoadingScreen/Loading';
import TransportView from './src/TransportView';
import Footer_btn from '../Footer/Footer_btn';
import Navbar from '../Navbar/Navbar';
import Variables from '../Variables';

export const Transport = () => {

    //Retrieving the ID
    const { id } = useParams();
    const splitedIds = id.split(/[-]/);

    // Loader function!
    const [loader, setLoader] = useState(false);

    // Options handler!
    const [input, setInput] = useState();
    const [vehicle, setVehicle] = useState();

    // Set the vehicle!
    const stateVehicle = (id, selected) => {
        if(selected){
            setVehicle(id);
        } else {
            setVehicle("");
        }
    }

    const processData = () => {
        console.log(vehicle);
        console.log(input);
    }

    // Getting the vehicle from the server list!
    const [vdata, setVdata] = useState([]);
    const getVehicle = () => {
        setLoader(true);
        axios.get(`${Variables.host}/${splitedIds[0]}/getAllVehicle`)
            .then(res => {
                if (res.data.success) {
                    setVdata(res.data.message);
                    setLoader(false);
                } else {
                    // TODO: Error handling and loader functionality!
                }
            })
    }

    // Calling the get vehicle function everytime before the DOM renders!
    useEffect(() => {
        getVehicle();
    }, [])


    return (
        <div>
            <Navbar id={id} lodgeId={splitedIds[0]} roomId={splitedIds[1]} />
            {
                loader ? (
                    <Loading alignOperator={"top-align-nav-present"} />
                ) : (
                    <div className="container">
                        <div className="container input-box">
                            <div class="input-group input-group-sm mb-3">
                                <input type="text" class="form-control"placeholder = "Enter your destination here.." aria-label="Small" aria-describedby="inputGroup-sizing-sm" onChange={(e) => setInput(e.target.value)} />
                            </div>
                        </div>
                        <div className = "topic text-center">
                            Choose your desired vehicle
                        </div>
                        <div className = "overscroll">
                            {
                                vdata.map((item, key) => {
                                    return (
                                        <TransportView vehicle={item.vehicle} charge={item.charge} duty={item.duty} id = {item._id} book = {(id, selected) => stateVehicle(id, selected)} />
                                    )
                                })
                            }
                        </div>
                        <Footer_btn  onClick = {() => processData()}/>
                    </div>
                )
            }
        </div>
    )
}
