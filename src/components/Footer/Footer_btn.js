import React from 'react'

const Footer_btn = (props) => {
  return (
    <div className = "container" onClick={() => props.onClick()}>
        <div className = "footer btn btn-success">
            Book Ride
        </div>
    </div>
  )
}

export default Footer_btn;