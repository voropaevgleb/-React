import React, { useState } from 'react';

const Item = () => {
  const [puzzles, setPuzzles] = useState([
    {
      id: 1,
      description: "Что можно увидеть с закрытыми глазами?",
      options: ["Сон", "Ветер", "Муха", "Тьма"],
      correct: 0
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
  ]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [newPuzzle, setNewPuzzle] = useState({
    description: "",
    options: ["", "", "", ""],
    correct: 0
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPuzzle(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleOptionChange = (index, e) => {
    const newOptions = [...newPuzzle.options];
    newOptions[index] = e.target.value;
    setNewPuzzle(prevState => ({
      ...prevState,
      options: newOptions
    }));
  };

  const handleAnswerChange = (index) => {
    setNewPuzzle(prevState => ({
      ...prevState,
      correct: index
    }));
  };

  const addPuzzle = () => {
    setPuzzles(prevPuzzles => [...prevPuzzles, { ...newPuzzle, id: puzzles.length + 1 }]);
    setNewPuzzle({
      description: "",
      options: ["", "", "", ""],
      correct: 0
    });
  };

  const handleSubmit = () => {
    setShowResult(true);
  };

  const calculateScore = () => {
    let score = 0;
    puzzles.forEach((puzzle, index) => {
      if (selectedAnswers[index] === puzzle.correct) {
        score++;
      }
    });
    return score;
  };

  return (
    <div>
      {puzzles.map((puzzle, index) => (
        <div key={index}>
          <h3>{puzzle.description}</h3>
          <ul>
            {puzzle.options.map((option, optionIndex) => (
              <li key={optionIndex}>
                <input
                  type="radio"
                  id={`option_${index}_${optionIndex}`}
                  name={`option_${index}`}
                  value={optionIndex}
                  checked={selectedAnswers[index] === optionIndex}
                  onChange={() => setSelectedAnswers({
                    ...selectedAnswers,
                    [index]: optionIndex
                  })}
                  disabled={showResult}
                />
                <label htmlFor={`option_${index}_${optionIndex}`}>{option}</label>
              </li>
            ))}
          </ul>
        </div>
      ))}
      {!showResult && (
        <div>
          <h3>Добавить новую загадку:</h3>
          <div>
            <label htmlFor="description">Загадка:</label>
            <input type="text" id="description" name="description" value={newPuzzle.description} onChange={handleInputChange} />
          </div>
          {newPuzzle.options.map((option, index) => (
            <div key={index}>
              <label htmlFor={`option_${index}`}>Ответ {index + 1}:</label>
              <input type="text" id={`option_${index}`} name={`option_${index}`} value={option} onChange={(e) => handleOptionChange(index, e)} />
              <input type="radio" id={`correct_${index}`} name="correct" value={index} checked={newPuzzle.correct === index} onChange={() => handleAnswerChange(index)} />
              <label htmlFor={`correct_${index}`}>Правильный ответ</label>
            </div>
          ))}
          <button onClick={addPuzzle}>Добавить загадку</button>
          <button onClick={handleSubmit}>Завершить тест</button>
        </div>
      )}
      {showResult && (
        <div>
          <h2>Результаты теста:</h2>
          <p>Правильных ответов: {calculateScore()} из {puzzles.length}</p>
          <h3>Правильные ответы:</h3>
          <ul>
            {puzzles.map((puzzle, index) => (
              <li key={index}>
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
