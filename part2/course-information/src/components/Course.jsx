const Course = ({ course }) => {
  const total = course.parts.reduce((a, b) => a + b.exercises, 0);

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total total={total} />
    </div>
  );
};

const Header = ({ course }) => <h2>{course.name}</h2>;

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

export default Course;

