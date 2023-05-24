import React from 'react'
import { divColor, textLight } from '../utils/constants'

function Input({ type, required, placeHolder, handler }) {
    return (
        <input style={{
            backgroundColor:divColor,
            border:'none',
            padding:'15px',
            width:'80%',
            margin:'10px',
            borderRadius:'200px',
            color:textLight,
            fontSize:'12px'
        }} required={required} type={type} placeholder={placeHolder} onChange={e => {
            handler(e.target.value)
        }} />
    )
}

export default Input