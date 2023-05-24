import React from 'react'
import { btnColor, textLight } from '../utils/constants'

function Button({ btnText, handler, isDisabled }) {
    return (
        <button style={{
            background:btnColor,
            border:'none',
            padding:'10px',
            color:textLight,
            borderRadius:'200px',
            margin:'10px',
            minWidth:'50%'
        }} disabled={isDisabled} onClick={() => handler()}>
            {btnText}
        </button>
    )
}

export default Button