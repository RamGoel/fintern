import React from 'react'
import Button from '../../components/Button'
import { useNavigate } from 'react-router'
import './Auth.css'
import { bgColor, textLight } from '../../utils/constants'
function Role() {
    const navigate = useNavigate()
    return (
        <div id="roleDiv" style={{
            backgroundColor: bgColor
        }}>
            <div>
                <h1 style={{color:textLight}}>
                    First <span>Intern</span> is here
                </h1>
                <div>
                    <Button handler={() => {
                        navigate('/candidate/login')
                    }} btnText={'I need a Internship'} />
                    <Button handler={() => {
                        navigate('/recruiter/login')
                    }} btnText={'I need a Intern'} />
                </div>

                <p style={{
                    color:textLight
                }}>Crafted with ♡ by Ram Goel </p>
            </div>

        </div>
    )
}

export default Role