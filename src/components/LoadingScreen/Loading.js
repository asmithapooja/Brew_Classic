import React from 'react';
import {Triangle} from "react-loader-spinner";

const Loading = (props) => {
    return (
        <div className = "d-flex align-items-center justify-content-center">
            <div className = {props.alignOperator}>
                <Triangle
                    height="150"
                    width="150"
                    radius="20"
                    color="white"
                    ariaLabel="loading"
                    wrapperStyle
                    wrapperClass
                />
            </div>
        </div>
    )
}

export default Loading;