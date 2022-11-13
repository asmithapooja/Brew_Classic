import { useState, useEffect } from "react";
import React from 'react';

const NavPagination = (props) => {

    const changeResponse = () => {
        props.response(props.type)
    }

    // Setting the state to the last rendenred data..
    useEffect(() => {
        props.response(props.type)
    },[])

    return (
        <li className ="nav-item">
            <a>
                <button className = "nav-link highlights" onClick={changeResponse}>
                    {props.type}
                </button>
            </a>
        </li>
    )
}

export default NavPagination