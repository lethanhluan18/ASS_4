import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeaderNav from '../components/HeaderNav';
import {
  fetchQuestions,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  setEditingQuestion,
  clearEditingQuestion,
  clearQuestionMessages,
} from '../redux/questionSlice';

const ManageQuestions = () => {
  const dispatch = useDispatch();
  const { questions, editingQuestion, loading, error, successMessage } =
    useSelector((state) => state.questions);

  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  // When editingQuestion changes, populate or clear form
  useEffect(() => {
    if (editingQuestion) {
      setQuestionText(editingQuestion.questionText || '');
      const currentOpts = [...(editingQuestion.options || [])];
      while (currentOpts.length < 4) currentOpts.push('');
      setOptions(currentOpts.slice(0, 4));
      setCorrectAnswerIndex(editingQuestion.correctAnswerIndex ?? 0);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      resetForm();
    }
  }, [editingQuestion]);

  const resetForm = () => {
    setQuestionText('');
    setOptions(['', '', '', '']);
    setCorrectAnswerIndex(0);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!questionText.trim()) {
      alert('Please enter a question text.');
      return;
    }

    const cleanedOptions = options.map((opt) => opt.trim()).filter(Boolean);
    if (cleanedOptions.length < 2) {
      alert('Please provide at least 2 options.');
      return;
    }

    const indexNum = parseInt(correctAnswerIndex, 10);
    if (isNaN(indexNum) || indexNum < 0 || indexNum >= cleanedOptions.length) {
      alert(`Correct Answer Index must be between 0 and ${cleanedOptions.length - 1}.`);
      return;
    }

    const payload = {
      questionText: questionText.trim(),
      options: cleanedOptions,
      correctAnswerIndex: indexNum,
    };

    if (editingQuestion) {
      dispatch(updateQuestion({ id: editingQuestion._id, data: payload }));
    } else {
      dispatch(addQuestion(payload));
      resetForm();
    }
  };

  const handleEditClick = (q) => {
    dispatch(setEditingQuestion(q));
  };

  const handleCancelEdit = () => {
    dispatch(clearEditingQuestion());
    resetForm();
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      dispatch(deleteQuestion(id));
    }
  };

  return (
    <div className="container" style={{ maxWidth: '980px' }}>
      <HeaderNav />

      <div className="py-2">
        <h2 className="fw-semibold mb-4" style={{ fontSize: '2rem', color: '#1a1a1a' }}>
          Questions
        </h2>

        {successMessage && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            {successMessage}
            <button
              type="button"
              className="btn-close"
              onClick={() => dispatch(clearQuestionMessages())}
            ></button>
          </div>
        )}

        {error && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {error}
            <button
              type="button"
              className="btn-close"
              onClick={() => dispatch(clearQuestionMessages())}
            ></button>
          </div>
        )}

        {/* Question Form matching Screenshot 7 */}
        <form onSubmit={handleSubmit} className="mb-5">
          {/* Question Text row */}
          <div className="row mb-3 align-items-center">
            <label
              className="col-sm-3 col-form-label fs-6 fw-normal"
              style={{ color: '#212529' }}
            >
              Question Text:
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control"
                style={{ borderColor: '#d1d5db', padding: '8px 12px' }}
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder=""
                required
              />
            </div>
          </div>

          {/* Options row */}
          <div className="row mb-3">
            <label
              className="col-sm-3 col-form-label fs-6 fw-normal pt-2"
              style={{ color: '#212529' }}
            >
              Options:
            </label>
            <div className="col-sm-9">
              {options.map((opt, idx) => (
                <div key={idx} className="mb-2">
                  <input
                    type="text"
                    className="form-control"
                    style={{ borderColor: '#d1d5db', padding: '8px 12px' }}
                    value={opt}
                    onChange={(e) => handleOptionChange(idx, e.target.value)}
                    placeholder=""
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Correct Answer Index row */}
          <div className="row mb-4 align-items-center">
            <label
              className="col-sm-3 col-form-label fs-6 fw-normal"
              style={{ color: '#212529' }}
            >
              Correct Answer Index:
            </label>
            <div className="col-sm-9">
              <input
                type="number"
                min="0"
                max={Math.max(0, options.filter(Boolean).length - 1)}
                className="form-control"
                style={{ borderColor: '#d1d5db', padding: '8px 12px' }}
                value={correctAnswerIndex}
                onChange={(e) => setCorrectAnswerIndex(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Form Submit & Cancel buttons */}
          <div className="d-flex gap-2">
            <button
              type="submit"
              className="btn btn-primary w-100 py-2"
              style={{
                backgroundColor: '#1a73e8',
                borderColor: '#1a73e8',
                fontSize: '1rem',
                fontWeight: '500',
              }}
              disabled={loading}
            >
              {editingQuestion ? 'Update Question' : 'Add Question'}
            </button>
            {editingQuestion && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="btn btn-secondary px-4 py-2"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Questions List matching Screenshot 7 */}
        <div className="mt-4 border-top pt-4">
          {loading && questions.length === 0 ? (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" role="status"></div>
            </div>
          ) : questions.length === 0 ? (
            <div className="text-center text-muted py-4">No questions created yet.</div>
          ) : (
            questions.map((q) => (
              <div
                key={q._id}
                className="py-4 border-bottom"
                style={{ borderColor: '#e5e7eb' }}
              >
                <h3
                  className="fw-semibold mb-3"
                  style={{ fontSize: '1.45rem', color: '#1a1a1a' }}
                >
                  {q.questionText}
                </h3>

                <ul className="ps-3 mb-3" style={{ listStyleType: 'disc' }}>
                  {q.options.map((opt, idx) => (
                    <li
                      key={idx}
                      className="mb-1"
                      style={{
                        fontSize: '1rem',
                        color: idx === q.correctAnswerIndex ? '#0f5132' : '#333',
                        fontWeight: idx === q.correctAnswerIndex ? '500' : 'normal',
                      }}
                    >
                      {opt} {idx === q.correctAnswerIndex && <span className="badge bg-success-subtle text-success border ms-2">Correct</span>}
                    </li>
                  ))}
                </ul>

                <div>
                  <button
                    onClick={() => handleEditClick(q)}
                    className="btn btn-warning me-2 px-3 py-1 text-white"
                    style={{ backgroundColor: '#ffc107', borderColor: '#ffc107' }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(q._id)}
                    className="btn btn-danger px-3 py-1"
                    style={{ backgroundColor: '#dc3545', borderColor: '#dc3545' }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageQuestions;

