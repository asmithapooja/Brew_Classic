import React, { useState, useEffect } from 'react'
import Loading from '../LoadingScreen/Loading';
import Footer from '../Footer/Footer';
import Variables from '../Variables';
import axios from 'axios';
import GlobalBar from './src/Global';

const Menu = (props) => {

    const [dishdata, setDishdata] = useState([]);

    // Loader
    const [loading, setLoading] = useState(false);

    const getData = () => {
        setLoading(true);
        const categeory = {
            type: props.type
        }
        //console.log(`${Variables.host}/${splitedIds}/roombyid`)
        axios.post(`${Variables.host}/${props.lodgeId}/dishvaries`, categeory)
            .then(data => {
                setDishdata(data.data);
                setLoading(false);
            })
    }

    useEffect(() => {
        getData();
    }, [props.type])

    return (
        <div>
            {
                loading ? (
                    <Loading alignOperator = {"top-align-nav-present"} />
                ) : (
                    <div>
                        <div>
                        <p className='topic text-center'>
                            {props.type}
                        </p>
                         </div>
                        <div className = "global-modal-space">
                                {
                                dishdata.length == 0 ? (
                                    <div className='stock text-center'>
                                        No items in the list
                                    </div>
                                ) : (
                                    dishdata.map((item, key) => {
                                        return (
                                            <GlobalBar key={key.key} dishname={item.dishName} dishrate={item.dishRate} dishtype={item.dishType} dishid={item._id} engaged={item.available} lodgeId = {props.lodgeId} roomId = {props.roomId} roomno = {props.roomno} />
                                        )
                                    })
                                )
                            }
                        </div>
                        <Footer lodgeId = {props.lodgeId} roomId = {props.roomId} />
                    </div>    
                )
           }
        </div>


    )
}

export default Menu;