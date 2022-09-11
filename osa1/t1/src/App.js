import { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({text,value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good,neutral,negative}) => {
  const total_reviews = good+neutral+negative

  if (total_reviews === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  const avg = (good-negative)/total_reviews
  const pos = (good/total_reviews)*100

  return (
    <table>
      <tbody>
        <StatisticLine text="Good" value={good}/>
        <StatisticLine text="Neutral" value={neutral}/>
        <StatisticLine text="Negative" value={negative}/>
        <StatisticLine text="Average" value={avg}/>
        <StatisticLine text="Positive" value={pos}/>
      </tbody>
    </table>
  )
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


const getMax = object => {
  return Object.keys(object).filter(x => {
        return object[x] === Math.max.apply(null, 
        Object.values(object));
  });
};

const App = () =>  {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const strt_sint = getRandomInt(anecdotes.length)
  const votes_base = new Uint8Array(anecdotes.length)

  const [good,setGood] = useState(0)
  const [neutral,setNeutral] = useState(0)
  const [negative,setNegative] = useState(0)
  const [selected, setSelected] = useState(strt_sint)
  const [votes,setVotes] = useState(votes_base)


  const HandleGood = () => {
    setGood(good+1)
  }

  const HandleNeutral = () => {
    setNeutral(neutral+1)
  }

  const HandleNegative = () => {
    setNegative(negative+1)
  }

  const HandleAnecdote = () => {
    const sint = getRandomInt(anecdotes.length)
    setSelected(sint)
  }

  const HandleVote = () => {
    setVotes(votes => ({...votes,[selected]:votes[selected]+1}))
  }
  
  const MostVoted = ({votes}) => {
    const mxkey = getMax(votes)

    return (
    <p>
      {anecdotes[mxkey[0]]}
    </p>
    )
  }

  return (
    <div>
      <h3>{anecdotes[selected]}</h3>
      <p>Has {votes[selected]} votes</p>

      <Button handleClick={HandleAnecdote} text="next anecdote"/>
      <Button handleClick={HandleVote} text="vote"/>
      
      <h2> Anecdote with the most votes</h2>

      <MostVoted votes={votes}/>

      <h2>
        give feedback
      </h2>

      <Button handleClick={HandleGood} text="Good"/>
      <Button handleClick={HandleNeutral} text="Neutral"/>
      <Button handleClick={HandleNegative} text="Negative"/>

      <h2>
        statistics
      </h2>

      <Statistics good={good} neutral={neutral} negative={negative}/>

    </div>
  )
}

export default App;