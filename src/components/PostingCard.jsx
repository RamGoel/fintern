import React from 'react'
import { applyForPosting } from '../utils/api'
import { useSelector } from 'react-redux'
import './Card.css'
import { btnColor, divColor, textLight } from '../utils/constants'
function PostingCard({ data, isReviewer }) {
    const user = useSelector(state => state.auth.user)

    return (
        <div className='postingCard' style={{ backgroundColor: divColor }}>
            <h3 className='cardRole'>{data.role}</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p className='cardCompany'><i className='fa fa-building mr'></i>{data.company}</p>
                <p className='cardDuration'><i className='fa fa-clock mr'></i>{data.duration}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {(isReviewer) ? <button style={{
                    backgroundColor: btnColor,
                    borderRadius: '200px',
                    border: 0,
                    padding: '5px 10px',
                    color: textLight,
                    fontSize: '12px',
                    width:'40%'
                }} onClick={() => {
                    applyForPosting(user.userId, data.postingId, (data) => {
                        alert("Successfully Applied")
                    }, (err) => {
                        alert(err)
                    })
                }}>View Now  <i className='fa fa-angle-right'></i></button> : <button style={{
                    backgroundColor: btnColor,
                    borderRadius: '200px',
                    border: 0,
                    padding: '5px 10px',
                    color: textLight,
                    fontSize: '12px',
                    width: '50%'
                }} onClick={() => {
                    applyForPosting(user.userId, data.postingId, (data) => {
                        alert("Successfully Applied")
                    }, (err) => {
                        alert(err)
                    })
                }}>Apply Now  <i className='fa fa-angle-right'></i></button>}
                <p className='cardLocation'><i className="fa fa-location-arrow mr"></i>{data.location}</p>
            </div>

        </div>
    )
}

export default PostingCard