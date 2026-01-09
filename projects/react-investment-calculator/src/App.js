import { useState } from "react";
import Header from "./components/Header";
import InvestmentForm from "./components/InvestmentForm";
import Result from "./components/Result";

function App() {
  const [resultData , setResultData] = useState([]);

  const calculateHandler = (userInput) => {
        // Should be triggered when form is submitted
        // You might not directly want to bind it to the submit event on the form though...

        const yearlyData = []; // per-year results

        let currentSavings = +userInput['currentSavings']; // feel free to change the shape of this input object!
        const yearlyContribution = +userInput['yearlyContribution']; // as mentioned: feel free to change the shape...
        const expectedReturn = +userInput['expectedReturn'] / 100;
        const duration = +userInput['duration'];

        // The below code calculates yearly results (total savings, interest etc)
        for (let i = 0; i < duration;) {
            const yearlyInterest = currentSavings * expectedReturn;
            currentSavings += yearlyInterest + yearlyContribution;
            yearlyData.push({
                // feel free to change the shape of the data pushed to the array!
                year: i + 1,
                yearlyInterest: yearlyInterest,
                savingsEndOfYear: currentSavings,
                yearlyContribution: yearlyContribution,
                everyIntrest: i === 0 ? yearlyInterest : yearlyInterest + yearlyData[i-1].everyIntrest
            });
            i++
        }
        // do something with yearlyData ...
         setResultData(yearlyData);
         console.log(resultData)
    };
  return (
    <div>
      <Header />
      <InvestmentForm investmentFormInput={calculateHandler} />
      {resultData.length > 0 && <Result investmentResult={resultData} /> }
      {resultData.length === 0 && <p style={{textAlign: "center"}}>No result...</p>}
    </div>
  );
}

export default App;
