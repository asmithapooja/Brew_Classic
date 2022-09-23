import React, { useEffect, useState } from 'react';
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Variables from './Variables';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';



const GlobalBar = (props) => {

    const current = new Date();

    const [show, setShow] = useState(false);

    const [quantity, setQuantity] = useState();

    const [comments, setComments] = useState();

    const [invaliddata, setInvaliddata] = useState(false);

    const handleShow = () => setShow(!show);


    const { id } = useParams();

    const splitedIds = id.split(/[-]/);


    const addDish = () => {
        console.log(splitedIds[0]);
        const credentials = {
            roomid: splitedIds[1],
            roomno : props.roomno,
            dishname: props.dishname,
            quantity: quantity,
            comments: comments,
            time: current.toUTCString(),
            lodgeid : splitedIds[0]
        }
        axios.post(`${Variables.dishLodge}adddishroom`, credentials)
            .then(res => {
                if (res.data.success) {
                    handleShow();
                } else {
                    console.log(res.data.message)
                    setInvaliddata(true)
                }
            })
    }

    const handleInvalid = () => {
        setInvaliddata(false);
    }

    useEffect(() => {
        setTimeout(handleInvalid, 4000)
    }, [invaliddata])

    return (
        <div className='container'>
            <Modal show={show} onHide={handleShow} keyboard={false} backdrop="static">
                {
                    invaliddata ? (

                        <Alert show={invaliddata}>
                            <div className="container text-center">
                                That's a bad request!
                            </div>
                        </Alert>
                    ) : (
                        <div>
                        </div>
                    )
                }
                <Modal.Header closeButton>
                    <Modal.Title> Customize your order! </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        {props.dishname.toUpperCase()}
                    </p>
                    <input type="text" className="form-control" placeholder="Enter your dish quantity" name="quantity" value={quantity} onChange={((e) => setQuantity(e.target.value))} />
                    <input type="text" className="form-control" placeholder="Any specific requests" name="comments" value={comments} onChange={((e) => setComments(e.target.value))} />

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleShow}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={addDish}>
                        Req. Order
                    </Button>
                </Modal.Footer>
            </Modal>
            <div class="col" style={{ paddingBottom: "5vh" }}>
                <div class="card text-center">
                    <div class="card-header" style={{ color: "black" }}>
                        <strong>{props.dishname.toUpperCase()}</strong>
                    </div>
                    <div class="card-body">
                        <p style={{ color: "black" }}>STOCK: {
                            props.engaged == "In Stock" ? (
                                "In Stock"
                            ) : (
                                "Oops, sorry!"
                            )
                        }</p>
                        <p style={{ color: "black" }}>DISH RATE: {props.dishrate} Rs</p>
                        <p style={{ color: "black" }}>  {props.roomtype}</p>
                    </div>
                    {
                        (props.engaged == "In Stock" ? (
                            <div className="btn btn-info" onClick={handleShow}>
                                ADD ORDER
                            </div>
                        ) : (
                            <div className="btn btn-dark disabled">
                                ADD ORDER
                            </div>

                        )
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default GlobalBar;