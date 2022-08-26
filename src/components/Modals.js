import React, { useEffect, useState } from 'react'
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import Variables from './Variables';

const Modals = (props) => {


  const [quantity, setQuantity] = useState(props.quantity);
  

  const editData = (userdishId) => {
    console.log(userdishId);
    console.log(quantity);
    const credentials = {
      userDishId: userdishId,
      quantity: quantity
    }
    axios.post(`${Variables.dishLodge}edituserdish`, credentials)
      .then(res => {
        if (res.data.success) {
          props.alertbox(true)
        }
      })
  }

  const deleteDish = (userdishId) => {
    console.log(userdishId)
    const credentials = {
      userDishId: userdishId
    }
    axios.post(`${Variables.dishLodge}deletedish`, credentials)
      .then(res => {
        if (res.data.success) {
          props.ackbox(true)
          // props.load(true)
        }
      })
  }

  return (
    <div className='container'>
      <Modal.Body>
        <div className='row'>
          <div className="col">
            <p>
              {props.dishname}
            </p>
          </div>
          <div className="col">
            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name={quantity} value={quantity} onChange={((e) => setQuantity(e.target.value))} readwrite />
          </div>
          <div className="col">
            <p>
              {props.time}
            </p>
          </div>
          <div className="col">
            <div className='row'>
              <div className='col-2'>
                <i class="bi bi-bag-x-fill" onClick={() => deleteDish(props.userdishid)}></i>
              </div>
              <div className="col-2">
                <i class="bi bi-bag-check-fill" onClick={() => editData(props.userdishid)}></i>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </div>
  )
}

export default Modals