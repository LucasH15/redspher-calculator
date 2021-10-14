import React, { useState } from "react"
import axios from "axios"

const Calculator = () => {
    const [calcul, setCalcul] = useState("0")
    const [result, setResult] = useState(null)

    const addToCalcul = (character) => {
        setCalcul((_calcul) => _calcul !== "0" ? `${_calcul}${character}` : character)
    }

    const removeLastCharacter = () => {
        setCalcul((_calcul) => _calcul.length > "1" ? _calcul.slice(0, _calcul.length - 1) : "0")
    }

    const reset = () => {
        setResult(null)
        setCalcul("0")
    }

    const sendCalcul = () => {
        axios.post("/api/calcul", {
            calcul: calcul.replace("÷", "/").replace("x", "*")
        })
            .then((_response) => {
                setResult(_response.data)
            })
            .catch((_error) => {
                console.log(_error.message)
            })
    }

    const addSpace = (_calcul) => {
        return _calcul.replace("÷", " ÷ ").replace("-", " - ").replace("+", " + ").replace("x", " x ")
    }
    // TODO : add reset after result when first click
    // TODO : replace old symbol if already a symbol
    return (
        <div className="calculator">
            <div className="form-control">
                <p>{addSpace(calcul)} {result && "="}</p>
                {result && <p>{result}</p>}
            </div>
            {result ?
                <button className="btn btn-light" onClick={() => reset()}>AC</button>
                :
                <button className="btn btn-light" onClick={() => removeLastCharacter()}>CE</button>
            }
            <button className="btn btn-secondary" onClick={() => addToCalcul("7")}>7</button>
            <button className="btn btn-secondary" onClick={() => addToCalcul("8")}>8</button>
            <button className="btn btn-secondary" onClick={() => addToCalcul("9")}>9</button>
            <button className="btn btn-light" onClick={() => addToCalcul("÷")}>÷</button>
            <button className="btn btn-secondary" onClick={() => addToCalcul("4")}>4</button>
            <button className="btn btn-secondary" onClick={() => addToCalcul("5")}>5</button>
            <button className="btn btn-secondary" onClick={() => addToCalcul("6")}>6</button>
            <button className="btn btn-light" onClick={() => addToCalcul("x")}>×</button>
            <button className="btn btn-secondary" onClick={() => addToCalcul("1")}>1</button>
            <button className="btn btn-secondary" onClick={() => addToCalcul("2")}>2</button>
            <button className="btn btn-secondary" onClick={() => addToCalcul("3")}>3</button>
            <button className="btn btn-light" onClick={() => addToCalcul("-")}>-</button>
            <button className="btn btn-secondary" onClick={() => addToCalcul("0")}>0</button>
            <button className="btn btn-secondary" onClick={() => addToCalcul(".")}>.</button>
            <button className="btn btn-primary" onClick={() => sendCalcul()} disabled={result}>=</button>
            <button className="btn btn-light" onClick={() => addToCalcul("+")}>+</button>
        </div>
    )
}

export default Calculator
