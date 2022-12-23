import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Menu from '../../Menu/Menu';
import Variables from '../../Variables';
import NavPagination from '../NavPagination';


const Pagination = (props) => {

    // useState for the options value
    const [options, setOptions] = useState([]);

    // Get the ID from the params
    const { id } = useParams();

    // Response from the child component
    const [response, setResponse] = useState();

    // Splitting the ID
    const splitedIds = id.split(/[-]/);

    // Get the options from the REST
    const getOptions = () => {
        axios.post(`${Variables.host}/${splitedIds[0]}/alldishtype`)
            .then(res => {
                if (res.data.success) {
                    setOptions(res.data.message);
                } else {
                    // Make the modal for the rest call fails
                }
            })
            .catch(err => {
                console.log("Some internal error occured, please check the REST", err);
                // Make the modal for the alert window
            })
    }

    // Invoke the get option function everytime when pagination getting called
    useEffect(() => {
        getOptions();
    }, [])

    return (
        <div className = "container">
            <div className='tabs'>
                <ul class="nav nav-tabs">
                    {
                        options.map((item,key) =>{
                            return(
                                <NavPagination lodgeId = {splitedIds[0]} id = {id} type = {item.dishType} response = {setResponse}/>
                            )
                        })
                    }
                </ul>
            </div>
            <div>
                {
                    response ? (
                        <div>
                            <Menu type = {response} lodgeId = {splitedIds[0]} roomId = {splitedIds[1]} roomno = {props.roomno} />
                        </div>
                    ) : (
                        <div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Pagination