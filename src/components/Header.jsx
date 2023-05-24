import React from 'react'
import { appName } from '../utils/plugins'
import Button from './Button'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { btnColor, divColor, textLight } from '../utils/constants'

function Header() {
    const navigate = useNavigate()
    const user = useSelector(state => state.auth.user)
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding:'5px 20px',
            backgroundColor: divColor
        }}>
            <i style={{ color: textLight }} className='fa fa-lock'></i>
            <div
                style={{
                    width:'30px',
                    height:'30px',
                    backgroundColor:btnColor,
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center',
                    borderRadius:'200px'
                }}
                onClick={() => navigate(`/candidate/${user.userId}/account`,
                    { state: { id: user.userId } })} > <i style={{ color: textLight }} className='fa fa-user'></i></div>
        </div>
    )
}

export default Header