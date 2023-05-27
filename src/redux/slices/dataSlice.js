import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    postings: [],
    applied: [],
    postingsByReviewer: []

}

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setPostings: (state, action) => {
            state.postings = action.payload.data.filter(e => !e.applicants[action.payload.userId])
            state.applied = action.payload.data.filter(e => e.applicants[action.payload.userId] === true)
        },
        setPostingsByReviewer: (state, action) => {
            state.postingsByReviewer = action.payload
        }
    }
})

export const { setPostings, setPostingsByReviewer } = dataSlice.actions

export default dataSlice.reducer