import React from 'react'
import { bgColor, textLight } from '../utils/constants'

function Loader() {
  return (
    <div style={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        height:'100vh',
        backgroundColor:bgColor
    }}>
        <i style={{
          color:textLight
        }} className='fa fa-spinner fa-spin'></i>
    </div>
  )
}

export default Loader