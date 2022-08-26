import React, { useState, useEffect } from 'react'
import Navbar from './Navbar';
import axios from "axios";
import Variables from './Variables';
import {Link, useParams} from "react-router-dom";


const Service = () => {

    const {id} = useParams();

    const splitedIds = id.split(/[-]/);


    const [services, setServices] = useState([]);

    const [selectedservice, setSelectedservice] = useState();

    const selectedServices = () => {
        const credentials = {
            servicetype : selectedservice,
            roomId : splitedIds[1]
        }
        if(selectedservice == null || undefined){
            alert("Please select any services!")
        } else {
            axios.post(`${Variables.dishLodge}addserviceroom`, credentials)
            .then(data => {
                if(data.data == true){
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

    return (
        <div>
            <Navbar />
            <div className='container text-center serviceBox'>
                <p className='topic'>
                    Services We Offer
                </p>
                <div>
                    <select value = {selectedservice} onChange = {((e) => setSelectedservice(e.target.value))}>
                        {
                            services.map((item,key) => {
                                return(
                                    <option>
                                        {item.serviceType}
                                    </option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className='main-footer text-center'>
                    <div className = "container">
                        <button type="button" className='btn btn-outline-info' onClick={selectedServices}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Service