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

  // Fuction to add expression
  function addToInput(e) {
    const text = e.target.innerHTML
    calcInput.current.value += text;
    let elements = calcInput.current.value;
    let eleIndex = elements[elements.length-1];
    let eleIndex2 = elements[elements.length-2];
    const elementsSplit = elements.split("");

    // Prevent division or multiplication starting the expression
    if(elementsSplit[0] == 0 || elementsSplit[0] == "/" || elementsSplit[0] == '*'){
      elementsSplit.shift();
      elements = elementsSplit.join("")
      calcInput.current.value = elements;
    }
    // Prevent two signs from being input. (Very bad implementation, will refactor later)
      // Already found a better way to implement this.
    else if (eleIndex == '/' && eleIndex2 == '/' || eleIndex == '*' && eleIndex2 == '*' || eleIndex == '-' && eleIndex2 == '-' || eleIndex == '-' && eleIndex2 == '+' || eleIndex == '*' && eleIndex2 == '-' || eleIndex == '/' && eleIndex2 == '*' || eleIndex == '*' && eleIndex2 == '/' || eleIndex == '+' && eleIndex2 == '-' || eleIndex == '/' && eleIndex2 == '+' || eleIndex == '/' && eleIndex2 == '-' || eleIndex == '*' && eleIndex2 == '+' || eleIndex == '+' && eleIndex2 == '+'){
      elements = elements.slice(0, -1);
      calcInput.current.value = elements;
    }
    e.preventDefault();
  }

  // Function to do the calculations once the equate button is pressed
  function handleClick(event) {
    let elements = calcInput.current.value;
    let eleIndex = elements[elements.length-1];

    // Prevent operands from being the last element of the input
    if(eleIndex == '/' || eleIndex == '*' || eleIndex == '+' || eleIndex == '-' ){
      elements = elements.slice(0, -1);
      calcInput.current.value = elements;
    }
    let x = eval(`${elements}`);
    const y = String (x).split("");

    // Check if input value is empty and set state
    if (elements === "") {
      setResult(0)
    } else {
      setResult(x);
    }

    // Restrict decimal to 3 places
    if(y.includes(".")){
      x = parseFloat(x).toFixed(3);
      setResult(x);
      console.log("decimals")
    }
    // calcInput.current.focus();
    event.preventDefault();
  }

  // Delete a value
  const deleteValue = () => {
    const inputValue = calcInput.current.value
    let x = inputValue.split("");
    x.pop();
    calcInput.current.value = x.join(""); 
  }

  return (
    <div className="container">
      <div className="calc-items">
            <div className="text-box output">
              <textarea className='input-text' type="text" name="values" ref={calcInput} onFocus={(e) => e.target.readOnly = true}></textarea>
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
