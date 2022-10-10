import { useRef, useEffect, useState } from 'react';
import './App.css';

export default function Calculator() {
  const calcInput = useRef(null);
  const [result, setResult] = useState();
  // Set focus to the calculator input
   useEffect(() => {
     // setResult(0);
     // calcInput.current.focus();
  }, [])

  function addToInput(e) {
    calcInput.current.focus();
    const text = e.target.innerHTML
    calcInput.current.value = calcInput.current.value + text
    e.preventDefault();
  }

  // Error boundaries
  
  // Function to do the calculations once the equate button is pressed
  function handleClick(event) {
    const elements = calcInput.current.value
    const x = eval(`${elements}`)

    // Check if input value is empty
    if (calcInput.current.value === "") {
      setResult(0)
    } else {
      setResult(x);
      calcInput.current.value = x
    }
    calcInput.current.focus();
    event.preventDefault();
  }

  const deleteValue = () => {
    const inputValue = calcInput.current.value
    let x = inputValue.split("")
    x.pop()
    calcInput.current.value = x.join("")
  }

  return (
    <div className="calculator">
      <div className="calc-items">
        <form >
          <div className="text-box">
            <input className='input-text' name="values" ref={calcInput} onFocus={(e) => e.target.readOnly = true}></input>
            <div className='result'>{result}</div>
          </div>

          <div className="cols-4">
            <input className="items grey" value="AC" type="reset" onClick={() => setResult()} />
            <input className='items green' type="button" value="x" onClick={deleteValue} />
            <button className='items green' onClick={addToInput}>%</button>
            <button className='items green margin-null' onClick={addToInput}>/</button>
          </div>
          <div className="cols-4">
            <button className='items' onClick={addToInput}>7</button>
            <button className='items' onClick={addToInput}>8</button>
            <button className='items' onClick={addToInput}>9</button>
            <button className='items green margin-null' onClick={addToInput}>*</button>
          </div>

          <div className="cols-4">
            <button className='items' onClick={addToInput}>4</button>
            <button className='items' onClick={addToInput}>5</button>
            <button className='items' onClick={addToInput}>6</button>
            <button className='items green margin-null' onClick={addToInput}>-</button>
          </div>

          <div className="cols-4">
            <button className='items' onClick={addToInput}>1</button>
            <button className='items' onClick={addToInput}>2</button>
            <button className='items' onClick={addToInput}>3</button>
            <button className='items green margin-null' onClick={addToInput}>+</button>
          </div>

          <div className="cols-4x">
            <button className='items' onClick={addToInput}>0</button>
            <button className='items' onClick={addToInput}>.</button>
            <button className='items cyan margin-null span-2' type="submit" onClick={handleClick}>=</button>
          </div>
        </form>

      </div>
    </div>

  );
}
