/* eslint-disable react-hooks/rules-of-hooks */

import { useCallback, useState } from "react";
import QUESTION from "../Question";
import Question from '../components/Question';
import Result from './Result';

export default function quizz() {
    const [userAnswers, setUserAnswers] = useState([]);
    const [showResult, setShowResult] = useState(false);

    const activeQuestionIndex =  userAnswers.length;
    let quizzCompleted = activeQuestionIndex === QUESTION.length;
    const handleNextQue = useCallback(function handleNextQue(selectedAnswer) {
        setUserAnswers(prevAns => {
            return [...prevAns, selectedAnswer]
        }) 
    }, [])

    const handleSkipAnswers = useCallback(() => handleNextQue(null), [handleNextQue]);
    if (quizzCompleted) {
        return(
            <>
                {showResult && <Result data={userAnswers} />}
                {!showResult && <div>
                    <h1>Quizz has been completed successfully</h1>
                <button onClick={handleShowResult}>Show Result</button>
                    </div>}
            </>
        )
    }
    
    function handleShowResult() {
        quizzCompleted = false;
        setShowResult(true);
    }

    return (
        <>
            <div className="quizz">
            <Question key={activeQuestionIndex}
            index={activeQuestionIndex}
            onSelectAnswer={handleNextQue}
            onSkipAnswer={handleSkipAnswers} />
            </div>
        </>
    )
}