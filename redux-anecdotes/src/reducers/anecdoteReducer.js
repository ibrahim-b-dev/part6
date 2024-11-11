import { createSlice, current } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    incrementVoteCount(state, action) {
      const id = action.payload
      const anecdoteToVote = state.find((a) => a.id === id)

      if (anecdoteToVote) {
        anecdoteToVote.votes += 1
      }
    },
    addNewAnecdote(state, action) {
      state.push(action.payload)
    },
    initializeAnecdotes(state, action) {
      console.log(current(state))
      return action.payload
    },
  },
})

export const { incrementVoteCount, addNewAnecdote, initializeAnecdotes } =
  anecdoteSlice.actions

export const fetchAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(initializeAnecdotes(anecdotes))
  }
}

export const createAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createAnecdote(anecdote)
    dispatch(addNewAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (id) => {
  return async (dispatch, getState) => {
    const anecdote = getState().anecdotes.find((a) => a.id === id)
    if (anecdote) {
      const updatedAnecdote = await anecdoteService.voteAnecdote({
        ...anecdote,
        votes: anecdote.votes + 1,
      })
      dispatch(incrementVoteCount(id))
    }
  }
}

export default anecdoteSlice.reducer
