import React from 'react'
import Button from '../../components/Button'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { bgColor, textLight } from '../../utils/constants'
import './Recruiter.css'
function RecHome() {
    const navigate = useNavigate()
    const user = useSelector(state => state.auth.user)
    return (
        <div id='recHomeDiv' style={{
            backgroundColor: bgColor
        }}>
            <div>

                <Button btnText={'Add New Posting'} handler={() => navigate(`/recruiter/${user.userid}/addpost`, { relative: true })} />
                <div>
                    <div id='recHomeHeadBox'>

                        <div id='recHomeHead'>
                            <hr></hr>
                            <h3 style={{
                                color: textLight
                            }}>#YourPostings</h3>
                            <hr></hr>
                        </div>
                    </div>
                    <div>
                        {

                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecHome