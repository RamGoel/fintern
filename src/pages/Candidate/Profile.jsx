import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

function Profile() {
    const navigate=useNavigate()
    const user = useSelector(state => state.auth.user)
    if (!Object.keys(user).length) navigate('/')
    return (
        <div>{user.name}</div>
    )
}

export default Profile