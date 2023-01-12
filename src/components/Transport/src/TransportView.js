import React, {useState} from 'react'

const TransportView = (props) => {

    // Reminder handler!
    const [reminder, setReminder] = useState(false);
    const [selected, setSelected] = useState(true);
    const reminder_handler = async() => {
        if(!props.duty){
            setSelected(!selected);
            setReminder(!reminder);
            console.log(selected);
            await props.book(props.id, selected);
        } else {
            // TODO: Error handling!
        }
    }

    return (
        <div className = "container alertbox">
            <div className="card" style = {{backgroundColor: reminder ? "#B2FF66" : "white"}} onClick = {() => reminder_handler()}>
                <div className="card-header" style = {{color : "black"}}>
                    <div className={`col-sm-8 ${props.duty ? "offDuty" : "onDuty"}`}>
                        {props.vehicle} -- ({props.charge} Rs/Km)
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TransportView;