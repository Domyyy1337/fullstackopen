import { useState } from "react";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleAddGood = () => {
    setGood(good + 1);
  };

  const handleAddBad = () => {
    setBad(bad + 1);
  };

  const handleAddNeutral = () => {
    setNeutral(neutral + 1);
  };

  const feedbackItems = {
    good: {
      name: "good",
      amount: good,
      handleAdd: handleAddGood
    },
    neutral: {
      name: "neutral",
      amount: neutral,
      handleAdd: handleAddNeutral
    },
    bad: {
      name: "bad",
      amount: bad,
      handleAdd: handleAddBad
    },
  };

  return (
    <div>
      <Feedback feedbackItems={feedbackItems} />
      <Statistics feedbackItems={feedbackItems} />
    </div>
  );
};

const Feedback = ({ feedbackItems }) => {
  return (
    <div>
      <h1>give feedback</h1>
      <Button text={feedbackItems.good.name} onClick={feedbackItems.good.handleAdd}/>
      <Button text={feedbackItems.neutral.name} onClick={feedbackItems.neutral.handleAdd}/>
      <Button text={feedbackItems.bad.name} onClick={feedbackItems.bad.handleAdd}/>
    </div>
  );
};

const Statistics = ({ feedbackItems }) => {
  return (
    <div>
      <h1>statistics</h1>
      <StatisticItem text={feedbackItems.good.name} amount={feedbackItems.good.amount} />
      <StatisticItem
        text={feedbackItems.neutral.name}
        amount={feedbackItems.neutral.amount}
      />
      <StatisticItem text={feedbackItems.bad.name} amount={feedbackItems.bad.amount} />
    </div>
  );
};

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const StatisticItem = ({ text, amount }) => (
  <p>
    {text} {amount}
  </p>
);

export default App;
