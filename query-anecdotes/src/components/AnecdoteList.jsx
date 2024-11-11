import { useMutation, useQueryClient } from "@tanstack/react-query"
import { voteAnecdote } from "../../requests"
import { useContext } from "react"
import NotificationContext, {
  useNotificationDispatch,
} from "../NotificationContext"

const Anecdote = ({ anecdote, handleClick }) => {
  const { id, content, votes } = anecdote

  return (
    <div
      key={id}
      style={{
        marginBottom: "10px",
      }}
    >
      <div>{content}</div>
      <div>
        has {votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => {
  const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)
  const queryClient = useQueryClient()

  const voteAnecdoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"])
      queryClient.setQueryData(
        ["anecdotes"],
        anecdotes.map((a) =>
          a.id !== updatedAnecdote.id ? a : updatedAnecdote
        )
      )
    },
  })

  const [notification, notificationDispatch] = useContext(NotificationContext)

  const showNotification = useNotificationDispatch()

  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate({
      ...anecdote,
      votes: anecdote.votes + 1,
    })

    showNotification("anecdote voted")
  }

  return (
    <div>
      {sortedAnecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => handleVote(anecdote)}
        />
      ))}
    </div>
  )
}

export default AnecdoteList
