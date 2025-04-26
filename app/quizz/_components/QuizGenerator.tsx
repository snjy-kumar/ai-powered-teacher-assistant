'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheck, FiX, FiLoader } from 'react-icons/fi';

const QuizGenerator = () => {
  const [topic, setTopic] = useState('');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const generateQuiz = async () => {
    if (!topic.trim()) return;
    
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: topic.trim() }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to generate quiz: ${errorText}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType?.includes('application/json')) {
        throw new Error('Invalid response format');
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Unknown error occurred');
      }

      if (!data.data || !Array.isArray(data.data)) {
        throw new Error('Invalid quiz data received');
      }

      setQuestions(data.data);
      setCurrentQuestion(0);
      setSelectedAnswer(null);
      setShowResults(false);
      setScore(0);
    } catch (err) {
      console.error('Generation error:', err);
      const errorMessage = err instanceof Error 
        ? err.message.replace('Failed to generate quiz: ', '') 
        : 'An unknown error occurred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

interface QuizQuestion {
    question: string;
    options: string[];
    correctAnswer: number;
}

const handleAnswer = (answerIndex: number): void => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    if (answerIndex === questions[currentQuestion].correctAnswer) {
        setScore(prev => prev + 1);
    }
};

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      setShowResults(true);
    }
  };

  if (showResults) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto p-6  rounded-xl shadow-lg"
      >
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
          Quiz Results
        </h2>
        <div className="text-center text-2xl mb-8">
          You scored {score} out of {questions.length}!
        </div>
        <button
          onClick={() => {
            setQuestions([]);
            setShowResults(false);
          }}
          className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all"
        >
          Start New Quiz
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto p-6  rounded-xl shadow-lg"
    >
      {questions.length === 0 ? (
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            AI Quiz Generator
          </h1>
          <div className="space-y-4">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter quiz topic (e.g., 'Space Exploration')"
              className="w-full p-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
              onKeyDown={(e) => e.key === 'Enter' && generateQuiz()}
            />
            <button
              onClick={generateQuiz}
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <FiLoader className="animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate Quiz'
              )}
            </button>
            {error && (
              <div className="p-3 bg-red-50 text-red-600 rounded-lg border border-red-200">
                Error: {error}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center mb-6">
            <div className="text-gray-500">
              Question {currentQuestion + 1} of {questions.length}
            </div>
            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-purple-600"
                initial={{ width: 0 }}
                animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-6">
            {questions[currentQuestion].question}
          </h2>

          <div className="grid gap-4">
            {questions[currentQuestion].options.map((option, index) => {
              const isCorrect = index === questions[currentQuestion].correctAnswer;
              const isSelected = selectedAnswer === index;
              
              return (
                <motion.button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={selectedAnswer !== null}
                  className={`p-4 text-left rounded-lg transition-all ${
                    selectedAnswer === null
                      ? 'hover:bg-gray-600 border-2 border-gray-200'
                      : isCorrect
                      ? 'bg-green-400 border-2 border-green-500'
                      : isSelected
                      ? 'bg-red-400 border-2 border-red-500'
                      : 'bg-gray-400 border-2 border-gray-200'
                  }`}
                  whileHover={selectedAnswer === null ? { scale: 1.02 } : {}}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-medium">{String.fromCharCode(65 + index)}.</span>
                    <span>{option}</span>
                    {selectedAnswer !== null && (
                      isCorrect ? (
                        <FiCheck className="ml-auto text-green-500" />
                      ) : isSelected ? (
                        <FiX className="ml-auto text-red-500" />
                      ) : null
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {selectedAnswer !== null && (
            <motion.button
              onClick={nextQuestion}
              className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'Show Results'}
              <FiArrowRight />
            </motion.button>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default QuizGenerator;