import { useRef } from "react";
export default function Answer({ answer, userAnswers, answerState, onNext}) {
    let shuffleAnswers = useRef();
   
        if (!shuffleAnswers.current) {
            shuffleAnswers.current = [...answer];
            shuffleAnswers.current.sort(() => Math.random() - 0.5);
        }
   
    return (
        <ul>
            {shuffleAnswers.current.map((ans) => {
                const isSelected = ans === userAnswers;
                let cssClass = '';
                if(answerState === 'answered' && isSelected) {
                    cssClass = 'selected'
                } 
                if((answerState === 'correct' || answerState === 'wrong') && isSelected) {
                    cssClass = answerState
                }
                return <li key={ans}><button onClick={() => onNext(ans)} className={cssClass} disabled={answerState !== ''}>{ans}</button></li>
                })
            }
        </ul>
    )
}