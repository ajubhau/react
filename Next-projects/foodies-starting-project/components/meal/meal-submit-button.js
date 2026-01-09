import { useFormStatus } from 'react-dom';

function MealSubmit() {
    const { pending } = useFormStatus();
    return(
        <button type="submit" disabled={pending}>
            {pending ? 'Submitting...' : 'Share Meal'}
        </button>
    )
}
export default MealSubmit;