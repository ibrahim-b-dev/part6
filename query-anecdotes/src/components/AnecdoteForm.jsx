import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNotificationDispatch } from "../NotificationContext"
import { createAnecdote } from "../../requests"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const showNotification = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"])
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote))
    },
    onError: error => showNotification(error.response.data.error)
  })


  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ""
    newAnecdoteMutation.mutate({ content, votes: 0 })

    showNotification("new anecdote created")
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
