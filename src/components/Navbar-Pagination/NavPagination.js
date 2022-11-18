import { useState, useEffect } from "react";
import React from 'react';
import Menu from "../Menu/Menu";

const NavPagination = (props) => {

    const changeResponse = () => {
        props.response(props.type)
    }

    // Setting the state to the last rendenred data..
    useEffect(() => {
        props.response(props.type)
    }, [])

    return (
        <div>
            <div>
                <li className="nav-item">
                    <a>
                        <button className="nav-link highlights" onClick={changeResponse}>
                            {props.type}
                        </button>
                    </a>
                </li>
            </div>
        </div>
    )
}

export default NavPagination