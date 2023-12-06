import { useState, useEffect } from "react";
import { quiz } from "../data/quiz";
import Choices from "./Choices";
import Score from "./Score";
import Button from "./Button";
import LoadingSpinner from "./LoadingSpinner";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const QuizApp = () => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  const [loading, setLoading] = useState(false);
  const [quizTime, setQuizTime] = useState(30 * 60); // 30 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setQuizTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer); // Clear the timer on component unmount
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [activeQuestion]);

  function handleNext() {
    setLoading(true);
    setTimeout(() => {
      if (activeQuestion !== quiz.questions.length - 1) {
        setActiveQuestion((prev) => prev + 1);
      } else {
        setShowResult(true);
        setActiveQuestion(0);
      }

      setResult((prev) =>
        selectedAnswer
          ? {
              ...prev,
              score: prev.score + 10,
              correctAnswers: prev.correctAnswers + 1,
            }
          : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
      );
      setSelectedAnswerIndex(null);
    }, 1000);
  }

  function handlePrevious() {
    if (activeQuestion !== 0) {
      setActiveQuestion((prev) => prev - 1);
    }
  }

  function handleSelected(choice, index) {
    if (quiz.questions[activeQuestion].correctAnswer === choice) {
      setSelectedAnswer(true);
    } else {
      setSelectedAnswer(false);
    }
    setSelectedAnswerIndex(index);
  }

  function handlePlayAgain() {
    setActiveQuestion(0);
    setSelectedAnswer("");
    setSelectedAnswerIndex(null);
    setShowResult(false);
    setResult({
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
    });
    setQuizTime(1 * 60); // Reset quiz time to 30 minutes
  }

  return (
    <div className="h-auto w-[30rem] bg-white rounded-xl p-5 shadow-xl">
      <div className="mb-4">
        <div className="bg-gray-300 h-2 rounded-lg mb-2">
          <div
            className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-lg"
            style={{ width: `${((activeQuestion + 1) / quiz.questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {!showResult ? (
      <>

          <div className="text-center mb-3">
            <Button>
            <span className="text-lg">Time Remaining: {Math.floor(quizTime / 60)}:{quizTime % 60}</span>
            </Button>
          </div>

          <h2 className="text-xl">{quiz.questions[activeQuestion].question}</h2>
          <ul className="flex flex-col gap-3 my-3">
            {quiz.questions[activeQuestion].choices.map((choice, index) => (
              <Choices
                key={index}
                choice={choice}
                index={index}
                handleSelected={handleSelected}
                selectedAnswerIndex={selectedAnswerIndex}
              />
            ))}
          </ul>

          <div className="flex justify-between">
            <Button
              onClickEvent={handlePrevious}
              disabled={activeQuestion === 0}
              classes="text-start hover:bg-blue-200"
            >
               <FaArrowLeft className="text-xl" />prev
            </Button>

            <Button
              onClickEvent={handleNext}
              disabled={selectedAnswerIndex === null}
              classes="text-end"
            >
             <FaArrowRight className="text-xl" />
              {loading ? <LoadingSpinner /> : (activeQuestion !== quiz.questions.length - 1 ? "Next" : "Finish")}
            </Button>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-center text-3xl mb-5">Result</h1>
          <div className="px-10 text-center">
            <h2 className="text-2xl">Total Questions: {quiz.questions.length}</h2>
            <h2 className="text-2xl text-center">
              Score{" "}
              <p className="text-[6rem] leading-[6rem] -mb-3">
                {result.score}/
                <span className="text-[3rem]">{quiz.questions.length * 10}</span>
              </p>
            </h2>
            <div className="flex gap-4 justify-center items-center">
              <h2 className="text-lg text-green-600">
                Correct Answers: {result.correctAnswers}
              </h2>
              <h2 className="text-lg text-red-600">Wrong Answers: {result.wrongAnswers}</h2>
            </div>
          </div>

          <Button onClick={handlePlayAgain} classes="text-center hover:bg-blue-200">
            Play Again
          </Button>
        </>
      )}
    </div>
  );
};

export default QuizApp;
