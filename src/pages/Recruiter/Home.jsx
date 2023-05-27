import React from 'react'
import Button from '../../components/Button'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { bgColor, textLight } from '../../utils/constants'
import './Recruiter.css'
import { useEffect } from 'react'
import { setPostingsByReviewer } from '../../redux/slices/dataSlice'
import { getAllPostingsByReviewer } from '../../utils/api'
import PostingCard from '../../components/PostingCard'
function RecHome() {
    const navigate = useNavigate()
    const user = useSelector(state => state.auth.user)
    const dispatch=useDispatch()
    const postings=useSelector(state=>state.data.postingsByReviewer)
    useEffect(e => {
        console.log(user)
        getAllPostingsByReviewer(user.userId, (data) => {
            console.log("fmf",data)
            dispatch(setPostingsByReviewer(data))
        },(err)=>{
            console.log(err)
        })

        //eslint-disable-next-line
    }, [])
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
                            postings.map(e=>{
                                return <PostingCard data={e} isReviewer={true} />
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecHome