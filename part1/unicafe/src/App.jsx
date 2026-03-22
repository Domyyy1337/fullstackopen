import { useState } from "react";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = good + neutral + bad;
  const score = good - bad;
  const average = score / all;
  const positive = good / all;
  const goodPercentage = positive ? `${positive * 100} %` : "0 %";

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
      handleAdd: handleAddGood,
    },
    neutral: {
      name: "neutral",
      amount: neutral,
      handleAdd: handleAddNeutral,
    },
    bad: {
      name: "bad",
      amount: bad,
      handleAdd: handleAddBad,
    },
    all: {
      name: "all",
      amount: all,
    },
    average: {
      name: "average",
      amount: average ? average : 0,
    },
    goodPercentage: {
      name: "positive",
      amount: goodPercentage,
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
      <Button
        text={feedbackItems.good.name}
        onClick={feedbackItems.good.handleAdd}
      />
      <Button
        text={feedbackItems.neutral.name}
        onClick={feedbackItems.neutral.handleAdd}
      />
      <Button
        text={feedbackItems.bad.name}
        onClick={feedbackItems.bad.handleAdd}
      />
    </div>
  );
};

const Statistics = ({ feedbackItems }) => {
  return (
    <div>
      <h1>statistics</h1>
      {feedbackItems.all.amount === 0 ? (
        <p>No feedback given</p>
      ) : (
        <table>
          <tbody>
            <StatisticLine
              text={feedbackItems.good.name}
              amount={feedbackItems.good.amount}
            />
            <StatisticLine
              text={feedbackItems.neutral.name}
              amount={feedbackItems.neutral.amount}
            />
            <StatisticLine
              text={feedbackItems.bad.name}
              amount={feedbackItems.bad.amount}
            />
            <StatisticLine
              text={feedbackItems.all.name}
              amount={feedbackItems.all.amount}
            />
            <StatisticLine
              text={feedbackItems.average.name}
              amount={feedbackItems.average.amount}
            />
            <StatisticLine
              text={feedbackItems.goodPercentage.name}
              amount={feedbackItems.goodPercentage.amount}
            />
          </tbody>
        </table>
      )}
    </div>
  );
};

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const StatisticLine = ({ text, amount }) => (
  <tr>
    <td>{text} </td>
    <td>{amount}</td>
  </tr>
);

export default App;
