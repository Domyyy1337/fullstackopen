import { useMemo, useState } from "react";

const FEEDBACK_TYPES = ["good", "neutral", "bad"];

const App2 = () => {
  const [counts, setCounts] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleAddFeedback = (type) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [type]: prevCounts[type] + 1,
    }));
  };

  const feedbackItems = useMemo(
    () =>
      FEEDBACK_TYPES.map((type) => ({
        name: type,
        amount: counts[type],
      })),
    [counts]
  );

  return (
    <div>
      <Feedback types={FEEDBACK_TYPES} onAddFeedback={handleAddFeedback} />
      <Statistics items={feedbackItems} />
    </div>
  );
};

const Feedback = ({ types, onAddFeedback }) => {
  return (
    <div>
      <h1>give feedback</h1>
      {types.map((type) => (
        <Button key={type} text={type} onClick={() => onAddFeedback(type)} />
      ))}
    </div>
  );
};

const Statistics = ({ items }) => {
  return (
    <div>
      <h1>statistics</h1>
      {items.map((item) => (
        <StatisticItem key={item.name} text={item.name} amount={item.amount} />
      ))}
    </div>
  );
};

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const StatisticItem = ({ text, amount }) => (
  <p>
    {text} {amount}
  </p>
);

export default App2;
