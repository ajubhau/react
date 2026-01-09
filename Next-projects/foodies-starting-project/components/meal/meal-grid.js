import MealItem from "./meal-item";
import classes from './meal-grid.module.css';

export default function MealsGrid({meals}) {
    return (
        <ul className={classes.meals}>
            {meals.map(item => <li key={item.id}>
                <MealItem {...item}/>
            </li>)}
        </ul>
    )
}