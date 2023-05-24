import React, { useState } from 'react'
import { addNewPosting } from '../../utils/api'
import Loader from '../../components/Loader'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { bgColor, textLight } from '../../utils/constants'
function AddPosting() {
    const [form, setForm] = useState()
    const [loading, setLoading] = useState(false)
    function handleSubmit() {
        setLoading(true)
        addNewPosting(form, (data) => {
            setLoading(false)
            alert("Successfully Posted")
        }, err => {
            setLoading(false)
            alert(err)
        })
    }
    return (
        loading ? <Loader /> : <div id='addPostingDiv' style={{
            backgroundColor: bgColor
        }}>
            <form onSubmit={(e) => {
                e.preventDefault()
                handleSubmit()
            }}>
                <h1 style={{ color: textLight }}>
                    Add <span>Posting</span>
                </h1>
                <p style={{
                    color:textLight
                }}>It'll be live to candidates when you press submit</p>
                <Input required={true} type="text" placeHolder='Company' handler={val => {
                    setForm({ ...form, company: val })
                }} />
                <Input required={true} type="text" placeHolder='Role' handler={val => {
                    setForm({ ...form, role: val })
                }} />
                <Input required={true} type="text" placeHolder='Duration' handler={val => {
                    setForm({ ...form, duration: val })
                }} />
                <Input required={true} type="text" placeHolder='Location' handler={val => {
                    setForm({ ...form, location: val })
                }} />
                <Input required={true} type="text" placeHolder='Stipend' handler={val => {
                    setForm({ ...form, stipend: val })
                }} />

                <Button type='submit' btnText={'Create Posting'} handler={() => null} />
                <p style={{
                    color:textLight,
                    marginTop:'10px'
                }}><i className='fa fa-lock mr'></i>  end to end encrypted</p>
            </form>
        </div>
    )
}

export default AddPosting