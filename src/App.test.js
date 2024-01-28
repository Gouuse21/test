import React from 'react';
import Quiz from './Quiz';

const questions = [
  {
    text: 'What is 2 + 2?',
    options: ['3', '4', '5', '6'],
  },
  {
    text: 'What is the capital of France?',
    options: ['London', 'Berlin', 'Paris', 'Madrid'],
  },
  // Add more questions here
];

const App = () => {
  return (
    <div>
      <h1>Quiz App</h1>
      <Quiz questions={questions} duration={60} />
    </div>
  );
};

export default App;
