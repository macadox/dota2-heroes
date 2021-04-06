import React from 'react'
import CircleLoader from 'react-spinners/CircleLoader'

const Loading = () => {
    return (
        <div className="loader">
            <CircleLoader color='rgba(203, 205, 211, 0.88)'/>
            <span className="loader__text">Loading</span>
        </div>
    )
}

export default Loading
