import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    postings: [],
    jobs: [],
    internships: [],
    applied: []

}

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setPostings: (state, action) => {
            state.postings = action.payload.data
            state.jobs = action.payload.data.filter(e => e.isIntern === false)
            state.internships = action.payload.data.filter(e => e.isIntern === true)
            state.applied = action.payload.data.filter(e => e.applicants[action.payload.userId]!==true)
        }
    }
})

export const { setPostings } = dataSlice.actions

export default dataSlice.reducer