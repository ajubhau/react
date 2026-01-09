import classes from './Result.module.css';

export default function Result({investmentResult}) {
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    return <>
        <table className={classes.result}>
            <thead>
            <tr>
                <th>Year</th>
                <th>Total Savings</th>
                <th>Interest (Year)</th>
                <th>Total Interest</th>
                <th>Invested Capital</th>
            </tr>
            </thead>
            <tbody>
                {investmentResult.map((item, index) => <tr key={item.year}>
                    <td>{item.year}</td>
                    <td>{formatter.format(item.savingsEndOfYear)}</td>
                    <td>{formatter.format(item.yearlyInterest)}</td>
                    <td>{formatter.format(item.everyIntrest)}</td>
                    <td>{item.yearlyContribution}</td>
                </tr>)}
            </tbody>
        </table>
    </>
}