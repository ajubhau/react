import classes from './InvestmentForm.module.css';
import { useState } from 'react';

export default function InvestmentForm({investmentFormInput}){
    const [formData, setFormData] = useState({
        currentSavings: '',
        yearlyContribution: '',
        expectedReturn:'',
        duration: '',
    });

     const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
        ...prevState,
        [name]: value
        }));
    };

    function handleSubmit(event) {
        event.preventDefault();
        investmentFormInput(formData)
    }

    function handleReset() {
        setFormData({
            currentSavings: 0,
            yearlyContribution: 0,
            expectedReturn: 0,
            duration: 0
        })
    }

    return <>
        <form className={classes.form} onSubmit={handleSubmit}>
            <div className={classes['input-group']}>
                <p>
                    <label htmlFor="current-savings">Current Savings ($)</label>
                    <input type="number" value={formData.currentSavings} onChange={handleChange} name="currentSavings" />
                </p>
                <p>
                    <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
                    <input type="number" id="yearly-contribution" value={formData.yearlyContribution} onChange={handleChange} name="yearlyContribution" />
                </p>
            </div>
            <div className={classes['input-group']}>
                <p>
                    <label htmlFor="expected-return"> Expected Interest (%, per year)</label>
                    <input type="number" id="expected-return" value={formData.expectedReturn} onChange={handleChange} name="expectedReturn" />
                </p>
                <p>
                    <label htmlFor="duration">Investment Duration (years)</label>
                    <input type="number" id="duration" value={formData.duration} onChange={handleChange}  name="duration" />
                </p>
            </div>
            <p className={classes.actions}>
                <button type="reset" className={classes.buttonAlt} onClick={handleReset}>
                    Reset
                </button>
                <button type="submit" className={classes.button}>
                    Calculate
                </button>
            </p>
        </form>
    </>
}