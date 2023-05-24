import React, { useState } from 'react'
import Input from '../../components/Input'
import Button from '../../components/Button'
import Loader from '../../components/Loader'
import { loginUser } from '../../utils/api'
import { useDispatch } from 'react-redux'
import { setUser } from '../../redux/slices/authSlice'
import { useNavigate, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import './Auth.css'
import { bgColor, textLight } from '../../utils/constants'
function Login() {
  const [form, setForm] = useState({})
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { role } = useParams()
  const handleSubmit = () => {
    setLoading(true)
    loginUser({ ...form, role: role }, (data) => {
      dispatch(setUser(data))
      if (data.role === 'candidate') {
        navigate(`/candidate/${data.userId}/home`)
      } else {
        navigate(`/recruiter/${data.userId}/home`)
      }
      setLoading(false)
    }, err => {
      alert(err)
      setLoading(false)
    })
  }

  if (loading) {
    return <Loader />
  }
  return (
    <div id='loginDiv' style={{
      backgroundColor: bgColor
    }}>
      <form onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}>
        <h1 style={{ color: textLight }}>
          See <span>who</span> came back
        </h1>
        <Input required={true} type="email" placeHolder='Email Address' handler={val => {
          setForm({ ...form, email: val })
        }} />
        <Input required={true} type="password" placeHolder='Password' handler={val => {
          setForm({ ...form, password: val })
        }} />

        <Button type='submit' btnText={'Continue'} handler={() => null} />
        <p style={{
          color: textLight
        }}>Don't have an account, <Link to={`/${role}/signup`}>Signup</Link></p>
      </form>
    </div>
  )
}

export default Login