import React from 'react'

const Order = (props) => {
    return (
        <div>
            <div class="col" style={{ paddingBottom: "3vh" }}>
                <div className="cardBar">
                    <div class="card card-space">
                        <div class="card-header text-center" style={{ color: "black" }}>
                           <strong> {props.dishname.toUpperCase()} </strong>
                        </div>
                        <div class="card-body">
                            <p style = {{"color" : "black"}}>
                                Dish Name: {props.dishname}
                            </p>
                            <p style = {{"color" : "black"}}>
                               Deliver Status: {props.delivered}
                            </p>
                            <p style = {{color : "black"}}>
                                Time of Order: {props.timeOfOrder}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Order