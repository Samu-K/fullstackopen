const Course = ({course, parts}) => {
    const exnums = parts.map(x => x.exercises)

    let sum = 0
    exnums.forEach(x=> {
        sum += x;
    })

    return (
        <div>
        <h1>{course}</h1>
        <div>
            {parts.map(part => 
            <p key={part.id}>
            {part.name} {part.exercises}
            </p> 
        )}
        </div>
        <b>Total of exercises {sum}</b>
        </div>
    )
}

export default Course;