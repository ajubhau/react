// import { useState } from "react";
import QUESTION from '../Question.js';

export default function Result({data}) {
    // const [ans, setAns] = useState(data);
    const totalAttempt = data.filter((ans) => ans !== null).length;
    const correctAnswer = [];
    const wrongAnswer = [];
    

     data.map((ans, index) => {
        if(ans === QUESTION[index].answers[0]) {
            correctAnswer.push(ans);
        }
        if(ans !== null && ans !== QUESTION[index].answers[0]) {
            wrongAnswer.push(ans)
        }
     })
     const status = +correctAnswer.length/+totalAttempt * 100;
    return (
        <div className="result">
            <h1>Final Result </h1>
            <p>Status: <span className={status >= 70 ? 'c3' : 'c4'}>{status >= 70 ? 'Pass' : 'Fail'}</span></p>
            {/* <div className="result"> */}
                <div className="section c1">
                    <h3>Total Question</h3>
                    <p>{data.length}</p>
                </div>
                <div className="section c2">
                    <h3>Total Attepmt</h3>
                    <p>{totalAttempt}</p>
                </div>
                <div className="section c3">
                    <h3>Correct</h3>
                    <p>{correctAnswer.length}</p>
                </div>
                <div className="section c4">
                    <h3>Wrong</h3>
                    <p>{wrongAnswer.length}</p>
                </div>
            {/* </div> */}
        </div>
    )
}