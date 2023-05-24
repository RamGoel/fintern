import React, { useState } from 'react'
import Input from '../../components/Input'
import Button from '../../components/Button'
import Loader from '../../components/Loader'
import { candidateSignup } from '../../utils/api'
import { useNavigate, useParams } from 'react-router'
import { useDispatch } from 'react-redux'
import { setUser } from '../../redux/slices/authSlice'
import { Link } from 'react-router-dom'
import { bgColor, textLight } from '../../utils/constants'
function Signup() {
    const [form, setForm] = useState({})
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { role } = useParams()
    const handleSubmit = () => {
        setLoading(true)
        candidateSignup({ ...form, role: role }, (data) => {
            setLoading(false)
            dispatch(setUser(data));
            navigate(`/candidate/${data.userId}/home`)
        }, err => {
            alert(err)
            setLoading(false)
        })
    }

    if (loading) {
        return <Loader />
    }
    return (
        <div id={'signupDiv'} style={{
            backgroundColor: bgColor
        }}>
            <form onSubmit={(e) => {
                e.preventDefault()
                handleSubmit()
            }}>
                <h1 style={{ color: textLight }}>
                    Excited <span>to</span> have you
                </h1>
                <Input required={true} type="name" placeHolder='Full Name' handler={val => {
                    setForm({ ...form, name: val })
                }} />
                <Input required={true} type="email" placeHolder='Email Address' handler={val => {
                    setForm({ ...form, email: val })
                }} />
                <Input required={true} type="password" placeHolder='Password' handler={val => {
                    setForm({ ...form, password: val })
                }} />

                <Button type='submit' btnText={'Create Account'} handler={() => null} />
                <p style={{
                    color: textLight
                }}>Already have an account, <Link to={`/${role}/login`}>Login</Link></p>
            </form>
        </div>
    )
}

export default Signup