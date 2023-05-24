import React, { useEffect, useState } from 'react'
import { getAllPostings } from '../../utils/api'
import { useDispatch, useSelector } from 'react-redux'
import { setPostings } from '../../redux/slices/dataSlice'
import Loader from '../../components/Loader'
import PostingCard from './PostingCard'
import Header from '../../components/Header'
import Login from '../auth/Login'
import { useNavigate } from 'react-router'
import { bgColor, textLight } from '../../utils/constants'
import './Candidate.css'
import NoRecords from '../../components/NoRecords'
function Home() {
  const [selected, setSelected] = useState(0)
  const user = useSelector(state => state.auth.user)
  const internships = useSelector(state => state.data.internships)
  const applied = useSelector(state => state.data.applied)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(e => {
    setLoading(true)
    getAllPostings((result) => {
      dispatch(setPostings({ data: result, userId: user.id }))
      setLoading(false)
    }, err => {
      setLoading(false)
      alert(err)
    })
    console.log(user)
  }, [])

  if (!Object.keys(user).length) navigate('/')
  if (loading) return <Loader />
  return (
    <div className='#homeDiv' style={{
      backgroundColor: bgColor
    }}>
      <Header />
      <div style={{
        display: "flex",
        justifyContent: 'space-around',
        alignItems:'center'
      }}>
        <p
          className='candHomeTab'
          onClick={() => setSelected(0)}
          style={{
            borderBottom: (selected == 0 ? `1px solid ${textLight}` : ''),
            color: textLight
          }}>Internships</p>
        <p
          className='candHomeTab'
          onClick={() => setSelected(1)}
          style={{
            borderBottom: (selected == 1 ? `1px solid ${textLight}` : ''),
            color: textLight
          }}>Applied</p>

<i className='fa fa-sort-amount-asc'></i>
      </div>

      <div className='candHomeList'>
        
        {
          (selected == 0)
            ? internships.length ? internships.map(elem => {
              return <PostingCard data={elem} />
            }) : <NoRecords />
            : applied.length ? applied.map(elem => {
              return <PostingCard data={elem} />
            }) : <NoRecords />
        }
      </div>
    </div>
  )
}

export default Home