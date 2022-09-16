const Course = (props) => {
  const course = props.course
  const parts = props.parts
  const exnums = parts.map(x => x.exercises)

  let sum = 0
  exnums.forEach(x=> {
    sum += x;
  })

  return (
    <div>
      <h1>{course}</h1>
      <div>
        {parts.map(part => <p>{part.name} {part.exercises}</p> )}
      </div>
      <p>Number of exercises {sum}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Course course={course} parts={parts} />
    </div>
  )
}

export default App