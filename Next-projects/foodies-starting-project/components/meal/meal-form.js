'use client';

import ImagePicker from '@/components/image-picker';
import classes from './meal-form.module.css';
import MealSubmit from './meal-submit-button';

import { shareMeal } from '@/app/lib/action';
import { useActionState } from 'react';

function MealForm() {
    const [state, formAction] = useActionState(shareMeal, {message: null});
    return (
        <>
            <form className={classes.form} action={formAction}>
                <div className={classes.row}>
                    <p>
                    <label htmlFor="name">Your name</label>
                    <input type="text" id="name" name="name" required />
                    </p>
                    <p>
                    <label htmlFor="email">Your email</label>
                    <input type="email" id="email" name="email" />
                    </p>
                </div>
                <p>
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" name="title" required />
                </p>
                <p>
                    <label htmlFor="summary">Short Summary</label>
                    <input type="text" id="summary" name="summary" required />
                </p>
                <p>
                    <label htmlFor="instructions">Instructions</label>
                    <textarea
                    id="instructions"
                    name="instructions"
                    rows="10"
                    required
                    ></textarea>
                </p>
                {state && <p>{state.message}</p>}
                <ImagePicker label="Selected image" name="image" />
                <p className={classes.actions}>
                    <MealSubmit />
                </p>
            </form>
        </>
    )
}
export default MealForm;