import { useRef, useEffect, useState } from 'react';
import './App.css';

export default function Calculator() {
  const calcInput = useRef(null);
  const [result, setResult] = useState();
  // Set focus to the calculator input
 //  useEffect(() => {
 //    setResult(0);
 //    calcInput.current.focus();
 // }, [])

  function addToInput(e) {
    calcInput.current.focus();
    const text = e.target.innerHTML
    calcInput.current.value = calcInput.current.value + text
    e.preventDefault();
  }

  // Function to do the calculations once the equate button is pressed
  function handleClick(event) {
    let elements = calcInput.current.value;
    const elementsSplit = elements.split("");
    if(elementsSplit[0] == 0){
      elementsSplit.shift();
      elements = elementsSplit.join("")
    }
    let x = eval(`${elements}`);
    const y = String (x).split("");

    // Check if input value is empty
    if (elements === "") {
      setResult(0)
    } else {
      setResult(x);
    }
    if(elementsSplit[0] == 0){
      elementsSplit.shift();
      elements = elementsSplit.join("")
    }
    if(y.includes(".")){
      x = parseFloat(x).toFixed(4);
      setResult(x);
      console.log("decimals")
    }
    calcInput.current.focus();
    event.preventDefault();
  }

  const deleteValue = () => {
    const inputValue = calcInput.current.value
    let x = inputValue.split("")
    x.pop()
    calcInput.current.value = x.join("");
    
  }

  return (
    <div className="container">
      <div className="calc-items">
            <div className="text-box output">
              <input className='input-text' name="values" ref={calcInput} onFocus={(e) => e.target.readOnly = true}></input>
              <div className='result'>{result}</div>
            </div>
            <input className="items clear" value="AC" type="reset" onClick={() => {
        setResult();
      calcInput.current.value =""}
            }></input>
            <button className='items clear span-2' onClick={deleteValue}>DEL</button>             <button className='items operands ' onClick={addToInput}>/</button>
            <button className='items' onClick={addToInput}>7</button>
            <button className='items' onClick={addToInput}>8</button>
            <button className='items' onClick={addToInput}>9</button>
            <button className='items operands' onClick={addToInput}>*</button>
            <button className='items' onClick={addToInput}>4</button>
            <button className='items' onClick={addToInput}>5</button>
            <button className='items' onClick={addToInput}>6</button>
            <button className='items operands' onClick={addToInput}>-</button>
            <button className='items' onClick={addToInput}>1</button>
            <button className='items' onClick={addToInput}>2</button>
            <button className='items' onClick={addToInput}>3</button>
            <button className='items operands' onClick={addToInput}>+</button>
            <button className='items' onClick={addToInput}>0</button>
            <button className='items' onClick={addToInput}>.</button>
            <button className='items equate  span-2' onClick={handleClick}>=</button>
        </div>
      </div>
  );
}
