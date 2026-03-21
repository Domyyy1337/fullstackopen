function App() {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={course.parts.length} />
    </div>
  );
}

function Header(props) {
  return <h1>{props.course}</h1>;
}

function Content(props) {
  console.log(props);
  return (
    <div>
      {props.parts.map((part) => (
        <Part part={part} key={part.name} />
      ))}
    </div>
  );
}

function Part(props) {
  console.log(props);
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
}

function Total(props) {
  return <p>Number of exercises {props.total}</p>;
}

export default App;
