import React, {useState, useEffect} from 'react';
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import Variables from './Variables';


const Login = () => {

    const {id} = useParams();

    const splitedIds = id.split(/[-]/);


    const [phonenumber, setPhonenumber] = useState();
 
    const [lodgedata, setLodgedata] = useState();

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

    const processData = (e) => {
        e.preventDefault();
        const credentials = {
            phonenumber : phonenumber
        }
        if(phonenumber.length <= 0){
            alert("Please enter your phonenumber!")
        } else {
            axios.post(`${Variables.host}checkuser`,credentials)
            .then(res => {if(res.data == false){
                alert("User not found")
            }else {
                window.location = `/${id}/drinks`
            }})
        }
    }

    useEffect(() => {
        getData()
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
                            <input type="number" className="form-control form-control-inline" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Phone Number" name = {phonenumber} value = {phonenumber} onChange = {((e) => setPhonenumber(e.target.value))} />
                            <br />
                            <small id="emailHelp" class="form-text text-muted">We'll never share your phone number with anyone else.</small>
                        </div>
                        <div className = "submitButton text-center">
                            <button type="submit" class="btn btn-outline-primary">Submit</button>
                            <br />
                            <br />
                            <Link to = {`/${id}/signin`}  className = "btn btn-outline-success"> Signin </Link>
                            <br />
                            <br />
                            <button type="button" class="btn btn-outline-secondary"> Learn how to use it</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;