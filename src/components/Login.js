import React, { useState, useEffect } from 'react';
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import {link, useNavigate} from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import Variables from './Variables';


const Login = () => {

    let navigate = useNavigate();

    const { id } = useParams();

    const splitedIds = id.split(/[-]/);


    const [phonenumber, setPhonenumber] = useState();

    const [lodgedata, setLodgedata] = useState();

    const [show, setShow] = useState(false);

    const [alert, setAlert] = useState("");

    const handleClose = () => {
        setShow(!show);
    }

    const getData = () => {
        const credentials = {
            lodgeId: splitedIds[0]
        }
        axios.post(`${Variables.host}/${splitedIds[0]}/findlodge`, credentials)
            .then(data => {
                console.log(data.data);
                setLodgedata(data.data.username)
            })
    }

    const processData = (e) => {
        e.preventDefault();
        const credentials = {
            phonenumber: phonenumber,
            secondphonenumber : phonenumber
        }
        if (phonenumber.length <= 0) {
            setShow(!show);
            setAlert("Please enter your phone number!")
        } else {
            console.log(credentials);
            axios.post(`${Variables.host}/${splitedIds[1]}/checkuser`, credentials)
                .then(res => {
                   if(res.data.success){
                    localStorage.setItem("token", res.data.token);
                    navigate(`/${id}/static`, {replace : true})
                   } else {
                    setShow(!show);
                    setAlert(res.data.message)
                   }
                })
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div>
            <div className="heading-div">
                <div className='heading-div2 text-center'>
                    <h3 className="container heading">
                        {lodgedata}'s Inn!'
                    </h3>
                </div>
            </div>
            <div className='container'>
                <div className="loginSection text-center">
                    <form onSubmit={processData}>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Phone Number</label>
                            <br />
                            <input type="number" className="form-control form-control-inline" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Phone Number" name={phonenumber} value={phonenumber} onChange={((e) => setPhonenumber(e.target.value))} />
                            <br />
                            <small id="emailHelp" class="form-text text-muted">We'll never share your phone number with anyone else.</small>
                        </div>
                        <div className="submitButton text-center">
                            <button type="submit" class="btn btn-outline-primary">Submit</button>
                            <br />
                            <br />
                            <Link to={`/${id}/signin`} className="btn btn-outline-success"> Signin </Link>
                            <br />
                            <br />
                            <button type="button" class="btn btn-outline-secondary"> Learn how to use it</button>
                        </div>
                    </form>
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Invalid Credentials!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Error : User not found</Modal.Body>
                </Modal>
            </div>
        </div>
    )
}

export default Login;