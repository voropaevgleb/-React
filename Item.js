import React, { useState } from 'react';

const Item = () => {
  const puzzles = [
    {
      id: 1,
      description: "Что можно увидеть с закрытыми глазами?",
      options: ["Сон", "Ветер", "Муха", "Тьма"],
      correct: 0 // Индекс правильного ответа в массиве options
    },
    {
      id: 2,
      description: "Что у человека две, а у коровы четыре?",
      options: ["Руки", "Ноги", "Глаза", "Соски"],
      correct: 3
    },
    {
      id: 3,
      description: "В каком месяце 28 дней?",
      options: ["Только в феврале", "В каждом месяце", "Только в январе", "В апреле"],
      correct: 1
    },
    {
      id: 4,
      description: "Что может быть сломано, даже если оно никогда не было собрано?",
      options: ["Сердце", "Слово", "Река", "Зеркало"],
      correct: 1
    },
    {
      id: 5,
      description: "Что идет в лес, а ни одного дерева не приведет?",
      options: ["Путь", "Ветер", "Река", "Извинения"],
      correct: 0
    }
  ];

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const handleAnswerChange = (puzzleId, selectedOption) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [puzzleId]: selectedOption,
    });
  };

  const handleSubmit = () => {
    setShowResult(true);
  };

  const calculateScore = () => {
    let score = 0;
    puzzles.forEach(puzzle => {
      if (selectedAnswers[puzzle.id] === puzzle.correct) {
        score++;
      }
    });
    return score;
  };

  return (
    <div>
      {puzzles.map(puzzle => (
        <div key={puzzle.id}>
          <h3>{puzzle.description}</h3>
          <ul>
            {puzzle.options.map((option, index) => (
              <li key={index}>
                <input
                  type="radio"
                  id={`option_${puzzle.id}_${index}`}
                  name={`option_${puzzle.id}`}
                  value={index}
                  checked={selectedAnswers[puzzle.id] === index}
                  onChange={() => handleAnswerChange(puzzle.id, index)}
                  disabled={showResult}
                />
                <label htmlFor={`option_${puzzle.id}_${index}`}>{option}</label>
              </li>
            ))}
          </ul>
        </div>
      ))}
      {!showResult && <button onClick={handleSubmit}>Завершить тест</button>}
      {showResult && (
        <div>
          <h2>Результаты теста:</h2>
          <p>Правильных ответов: {calculateScore()} из {puzzles.length}</p>
          <h3>Правильные ответы:</h3>
          <ul>
            {puzzles.map(puzzle => (
              <li key={puzzle.id}>
                {puzzle.description}: {puzzle.options[puzzle.correct]}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Item;
