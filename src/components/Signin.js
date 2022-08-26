import axios from 'axios';
import React, {useEffect, useState} from 'react'
import {Link, useParams} from "react-router-dom";
import Variables from './Variables';

const Signin = () => {

    const {id} = useParams();

    const splitedIds = id.split(/[-]/);


    const [phonenumber, setPhonenumber] = useState();
    const [emailid, setEmailid] = useState();
    const [password, setPassword] = useState();
    const [confirmpassword, setConfirmpassword] = useState();

    const [lodgedata, setLodgedata] = useState();

    const processData = (e) => {
        e.preventDefault();
        const credentials = {
            phonenumber : phonenumber,
            emailid : emailid,
            password : password,
        }
        if(password !== confirmpassword){
            alert("Passwords dont match!")
        } else {
            axios.post(`${Variables.host}addusers`,credentials)
            .then(res =>  {if(res.data === true){
                    alert("Login Sucessfull");
                    console.log(res.data)
                    window.location = "/login"
                }else {
                    alert("Some error occured, please try again later!")
                }}
            )
        }
        console.log(credentials);
    }

    const getData = () => {
        const credentials = {
            lodgeId : splitedIds[0]
        }
        axios.post(`${Variables.dishLodge}findlodge`, credentials)
        .then(data => {
            console.log(data.data);
            setLodgedata(data.data.username)
        })
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div>
            <div className = "heading-div">
                <div className='heading-div2 text-center'>
                    <h3 className = "container heading">
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
                            <input type="text" className="form-control form-control-inline" id="exampleInputEmail1" placeholder="Enter Phone Number" name = {phonenumber} value = {phonenumber} onChange = {((e) => setPhonenumber(e.target.value))} />
                            <br />
                            <br />
                        </div>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Email Address</label>
                            <br />
                            <input type="email" className="form-control form-control-inline" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email" name = {emailid} value = {emailid} onChange = {((e) => setEmailid(e.target.value))} />
                            <br />
                            <br />
                        </div>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Password</label>
                            <br />
                            <input type="password" className="form-control form-control-inline" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Password" name = {password} value = {password} onChange = {((e) => setPassword(e.target.value))} />
                            <br />
                            <br />
                        </div>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Confirm Password</label>
                            <br />
                            <input type="password" className="form-control form-control-inline" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Confirm Password" name = {confirmpassword} value = {confirmpassword} onChange = {((e) => setConfirmpassword(e.target.value))} />
                            <br />
                            <br />
                        </div>
                        <br />
                        <div className = "submitButton text-center">
                            <button type="submit" class="btn btn-outline-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signin;