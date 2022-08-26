import React, { useState, useEffect } from 'react';
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Variables from './Variables';
import Modals from './Modals';


const Footer = () => {

  const [show, setShow] = useState(false);
  const [ackbox, setAckbox] = useState(false);
  const [alertbox, setAlertbox] = useState(false);

  const { id } = useParams();

  const splitedIds = id.split(/[-]/);

  const [data, setData] = useState([]);


  const handleShow = () => {
    console.log(show);
    setShow(!show);
    console.log(show)
  }


  const getData = () => {

    const credentials = {
      roomId: splitedIds[1]
    }
    axios.post(`${Variables.dishLodge}userdishes`, credentials)
      .then(data => {
        console.log(data.data);
        setData(data.data)
      })
  }

  useEffect(() => {
    setTimeout(getData(), 4000);
  },[ackbox,show, alertbox])



  const handleAckbox = () => {
    console.log("handle ackbox")
    setAckbox(!ackbox)
  }

  const handleAlertbox = () => {
    console.log("handle alertbox")
    setAlertbox(!alertbox)
  }

  useEffect(() => {
    if (ackbox) {
      setTimeout(handleAckbox, 4000)
    } else if (alertbox) {
      setTimeout(handleAlertbox, 4000)
    } 
  })



  return (
    <div className="main-footer text-center">
      <div className='container'>
        <Modal show={show} onHide={handleShow}>
          <Modal.Header closeButton>
            <Modal.Title> Check Your Orders</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="alertbox">
              {
                ackbox ? (

                  <Alert show={ackbox}>
                    <div className="container text-center">
                      Order has been removed from your list
                    </div>
                  </Alert>
                ) : (
                  <div>
                  </div>
                )
              }
              {
                alertbox ? (

                  <Alert show={alertbox}>
                    <div className="container text-center">
                      Order has been modified..
                    </div>
                  </Alert>
                ) : (
                  <div>
                  </div>
                )
              }
            </div>
          </Modal.Body>
          {
            data.map((item, key) => {
              return (
                <Modals dishname={item.dishName} quantity={item.quantity} time={item.time} userdishid={item._id} ackbox={setAckbox} alertbox={setAlertbox} />
              )
            })
          }
          <Modal.Footer>
            <div className="row">
              <Button variant="outline-secondary" onClick={handleShow}>
                Save & Close
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
        <button type="button" className='btn btn-outline-info' onClick={() => handleShow()}>
          Edit/Check your orders!
        </button>
      </div>
    </div>
  )
}

export default Footer