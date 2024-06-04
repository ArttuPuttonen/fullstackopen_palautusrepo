const Header = ({ course }) => {
    console.log(course);
    return (
      <h1>{course.name}</h1>
    );
  };
  
  const Part = ({ part, exercises }) => {
    console.log(part, exercises);
    return (
      <p>
        {part} {exercises}
      </p>
    );
  };
  
  const Content = ({parts}) => {
    console.log(parts);
    return (
      <div>
        {parts.map(part => (
          <Part key={part.id} part={part.name} exercises={part.exercises} />
        ))}
      </div>
    );
  };
  
  const Total = ({parts}) => {
    console.log(parts);
    return (
      <p>
        <strong>
          Total number of exercises{' '}
          {parts.reduce((total, part) => total + part.exercises, 0)}
        </strong>
      </p>
    );
  };
  
  const Course = ({course}) => {
    console.log(course);
    return (
      <div>
        <Header course={course} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    );
  }


export default Course;