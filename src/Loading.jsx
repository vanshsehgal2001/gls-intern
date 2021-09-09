import React from 'react'

import loading from './loading.gif'

const Loading = () => {
    return (
        <>
            <img src={loading} alt="loading" style={{ width: '200px', margin: 'auto', display:"block"}} />
        </>
    )
}

export default Loading
