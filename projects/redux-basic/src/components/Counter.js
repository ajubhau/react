import classes from './Counter.module.css';
import { useSelector, useDispatch } from 'react-redux';
import  { counterAction } from '../store/counter';
const Counter = () => {
  const dispatch = useDispatch();
  const toggleCounterHandler = () => {};
  const counter = useSelector((state) => state.counter.counter);

  function handleIncrement() {
    dispatch(counterAction.onIncrement())
  }

  function handleDecrement() {
    dispatch(counterAction.onDecrement())
  }
  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}><button onClick={handleIncrement}>+</button>{counter}<button onClick={handleDecrement}>-</button></div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
