// Quiz.js
import React, { useState, useEffect, useRef } from 'react';
import Question from './Question';
import './Quiz.css'; // Подключаем файл стилей

const Quiz = ({ questions, duration }) => {
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timerRef.current);
          setIsQuizFinished(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, []);

  const handleOptionSelect = (questionIndex, selectedOption) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: selectedOption,
    }));
  };

  const finishQuiz = () => {
    setIsQuizFinished(true);
    clearInterval(timerRef.current); // Остановка таймера
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        score += 1; // Добавляем 1 балл за каждый правильный ответ
      }
    });
    return score;
  };

  return (
    <div className="quiz-container">
      <div className="quiz-box">
        <h2>Оставшееся время: {timeLeft} секунд</h2>
        {timeLeft <= 0 || isQuizFinished ? (
          <div>
            <h2>Время вышло!</h2>
            <h3>Ваш результат:</h3>
            <p>Вы набрали {calculateScore()} из {questions.length} баллов.</p>
          </div>
        ) : (
          <div>
            {questions.map((question, index) => (
              <Question
                key={index}
                question={question.text}
                options={question.options}
                selectedOption={answers[index]}
                onOptionSelect={(selectedOption) => handleOptionSelect(index, selectedOption)}
              />
            ))}
            <button onClick={finishQuiz}>Завершить</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
