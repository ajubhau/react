import quizz from '../assets/quiz-image.png'
export default function Header() {
    return (
        <div className='header'>
            <img src={quizz} />
            <h2>React Quiz App </h2>
        </div>
    )
}