import { useState } from 'react'

const Button = ({title, handleClick}) => {
  return (
    <button onClick={handleClick}>{title}</button>
  );
};

const StatisticLine = ({title, value}) => {
  return (
    <tr>
      <td>{title}</td>
      <td>{value}</td>
    </tr>
  );
}

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const positive = (good / all) * 100;

  if (all === 0) {
    return <p>No feedback given</p>
  }

  return (
    <div>
      <StatisticLine title="good" value={good} />
      <StatisticLine title="neutral" value={neutral} />
      <StatisticLine title="bad" value={bad} />
      <StatisticLine title="all" value={all} />
      <StatisticLine title="average" value={average} />
      <StatisticLine title="positive" value={positive + " %"} />
    </div>
  );
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button title="good" handleClick={() => setGood(good + 1)} />
      <Button title="neutral" handleClick={() => setNeutral(neutral + 1)} />
      <Button title="bad" handleClick={() => setBad(bad + 1)} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App