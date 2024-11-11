import { useDispatch, useSelector } from "react-redux"
import { incrementVoteCount, voteAnecdote } from "../reducers/anecdoteReducer"
import { clearMessage, setMessage, setNotification } from "../reducers/notificationReducer"

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

const AnecdoteList = () => {
  const anecdotes = useSelector((state) =>
    state.anecdotes
      .filter((anecdote) =>
        anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
      )
      .slice()
      .sort((a, b) => b.votes - a.votes)
  )

  const dispatch = useDispatch()

  const handleVote = ({ id, content }) => {
    dispatch(voteAnecdote(id))
    dispatch(setNotification(`you voted '${content}'`, 5))
  }

  return (
    <div>
      {anecdotes.map((anecdote) => (
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
