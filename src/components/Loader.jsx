import React from 'react'
import './Loader.css'
const Loder = () => {
    return (

        <div style={ {
            position: "absolute",
            height: "98vh",
            width: "100vw",
            display: "flex",
            justifyContent: 'center',
            alignItems: "center",
            margin: "0",
            backgroundColor: "rgba(0, 0, 0, 0.5)"
        } }>
            <div class="loader">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div>
        </div>
    )
}

export default Loder