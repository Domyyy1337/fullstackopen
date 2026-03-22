const Header = ({ course }) => <h1>{course.name}</h1>;

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
};

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Total = ({ total }) => (
  <p>
    <b>Number of exercises {total}</b>
  </p>
);

const Course = ({ course }) => {
  const exercises = course.parts.map((part) => part.exercises);
  const total = exercises.reduce((a, b) => a + b, 0);

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total total={total} />
    </div>
  );
};

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
      {
        name: "CI/CD",
        exercises: 12,
        id: 4,
      },
    ],
  };

  return <Course course={course} />;
};

export default App;
