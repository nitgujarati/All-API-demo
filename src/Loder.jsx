import React from 'react'

const Loder = () => {
    return (
        <div style={ {
            position: "absolute",
            height: "98vh",
            width: "98vw",
            display: "flex",
            justifyContent: 'center',
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)"
        } }>
            <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    )
}

export default Loder