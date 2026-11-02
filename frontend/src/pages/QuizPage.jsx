import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeaderNav from '../components/HeaderNav';
import {
  fetchQuizQuestions,
  selectOption,
  submitCurrentAnswer,
  restartQuiz,
} from '../redux/quizSlice';

const QuizPage = () => {
  const dispatch = useDispatch();
  const {
    questions,
    currentIndex,
    selectedOption,
    score,
    isCompleted,
    loading,
    error,
  } = useSelector((state) => state.quiz);

  useEffect(() => {
    // If questions aren't loaded yet or empty, fetch them
    if (questions.length === 0) {
      dispatch(fetchQuizQuestions());
    }
  }, [dispatch, questions.length]);

  const currentQuestion = questions[currentIndex];

  const handleSubmitAnswer = () => {
    if (selectedOption === null) {
      alert('Please select an option before submitting!');
      return;
    }
    dispatch(submitCurrentAnswer());
  };

  const handleRestart = () => {
    dispatch(restartQuiz());
  };

  return (
    <div className="container" style={{ maxWidth: '980px' }}>
      <HeaderNav />

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading quiz questions...</span>
          </div>
          <p className="mt-3 text-secondary">Loading questions...</p>
        </div>
      ) : error ? (
        <div className="alert alert-danger my-4 text-center">{error}</div>
      ) : questions.length === 0 ? (
        <div className="text-center py-5">
          <h4 className="text-muted">No quiz questions available yet.</h4>
        </div>
      ) : isCompleted ? (
        /* Screenshot 4: Quiz Completed View */
        <div className="text-center py-5 mt-3">
          <h2 className="fw-normal mb-3" style={{ fontSize: '2.5rem', color: '#212529' }}>
            Quiz Completed
          </h2>
          <p className="fs-5 text-secondary mb-4">Your score: {score}</p>
          <button
            onClick={handleRestart}
            className="btn btn-primary px-4 py-2"
            style={{
              backgroundColor: '#1a73e8',
              borderColor: '#1a73e8',
              fontWeight: '500',
            }}
          >
            Restart Quiz
          </button>
        </div>
      ) : (
        /* Screenshot 3: Quiz Taking View */
        <div className="text-center py-4 mt-2">
          <h2 className="fw-normal mb-4" style={{ fontSize: '2.2rem', color: '#212529' }}>
            Quiz
          </h2>

          <h3
            className="fw-semibold mb-4"
            style={{ fontSize: '1.85rem', color: '#1a1a1a' }}
          >
            {currentQuestion?.questionText}
          </h3>

          <div
            className="d-inline-block text-start mb-4"
            style={{ minWidth: '220px' }}
          >
            {currentQuestion?.options.map((option, idx) => (
              <div key={idx} className="form-check mb-2" style={{ fontSize: '1.1rem' }}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="quizOption"
                  id={`option-${idx}`}
                  checked={selectedOption === idx}
                  onChange={() => dispatch(selectOption(idx))}
                  style={{ cursor: 'pointer' }}
                />
                <label
                  className="form-check-label ms-1"
                  htmlFor={`option-${idx}`}
                  style={{ cursor: 'pointer' }}
                >
                  {option}
                </label>
              </div>
            ))}
          </div>

          <div>
            <button
              onClick={handleSubmitAnswer}
              className="btn btn-primary px-4 py-2"
              style={{
                backgroundColor: '#1a73e8',
                borderColor: '#1a73e8',
                fontWeight: '500',
              }}
            >
              Submit Answer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;

