import axios from "axios"

const baseUrl = "http://localhost:3001/anecdotes"

export const getAnecdotes = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export const createAnecdote = async (newAnecdote) => {
  const response = await axios.post(baseUrl, newAnecdote)
  return response.data
}

export const voteAnecdote = async (anecdote) => {
  const url = `${baseUrl}/${anecdote.id}`

  const response = await axios.put(url, anecdote)
  return response.data
}
