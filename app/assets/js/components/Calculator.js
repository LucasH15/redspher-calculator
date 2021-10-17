import React, { useEffect, useState } from "react"
import axios from "axios"

const Calculator = () => {
    const [calcul, setCalcul] = useState("0")
    const [result, setResult] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    const addToCalcul = (character) => {
        if ((character === "÷" || character === "x" || character === "+") && calcul === "0") {
            setCalcul(`0${character}`)
        } else if ((character === "÷" || character === "x" || character === "+" || character === "-") &&
            (calcul.substr(calcul.length - 1, 1) === "+" || calcul.substr(calcul.length - 1, 1) === "-" || calcul.substr(calcul.length - 1, 1) === "x" || calcul.substr(calcul.length - 1, 1) === "÷")) {
            setCalcul((_calcul) => `${calcul.substr(0, calcul.length - 1)}${character}`)
        } else if (character === ".") {
            const lastPlus = calcul.lastIndexOf("+")
            const lastMinus = calcul.lastIndexOf("-")
            const lastMultiple = calcul.lastIndexOf("x")
            const lastDivide = calcul.lastIndexOf("÷")
            const lastCharacter = Math.max(lastPlus, lastMinus, lastMultiple, lastDivide)

            if (calcul.substr(calcul.length - 1, 1) !== ".") { // check if last character is not already a dot
                if (lastCharacter === -1 || calcul.substr(lastCharacter + 1).indexOf(".") === -1) { // check if already a symbol OR if not already a dot after last symbol
                    if (result) {
                        setResult(null)
                        setCalcul(".")
                    } else {
                        setCalcul((_calcul) => `${_calcul}.`)
                    }
                }
            }
        } else {
            if (result) {
                setResult(null)
                setCalcul(character)
            } else {
                setCalcul((_calcul) => _calcul !== "0" ? `${_calcul}${character}` : character)
            }
        }
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
            calcul: calcul.replaceAll("÷", "/").replaceAll("x", "*")
        })
            .then((_response) => {
                setResult(_response.data)
            })
            .catch((_error) => {
                setErrorMessage(_error.message)
            })
    }

    const addSpace = (_calcul) => {
        _calcul = _calcul.replaceAll("÷", " ÷ ").replaceAll("-", " - ").replaceAll("+", " + ").replaceAll("x", " x ")

        if (_calcul.substr(1, 1) === "-") {
            _calcul = _calcul.replace(" - ", "-")
        }

        return _calcul
    }

    useEffect(() => {
        const onKeyDown = ({key}) => {
            switch (key) {
                case "Backspace":
                    result ? reset() : removeLastCharacter()
                    break
                case "=":
                case "Enter":
                    sendCalcul()
                    break
                case "/":
                    addToCalcul("÷")
                    break
                case "*":
                    addToCalcul("x")
                    break
                case "-":
                case "+":
                case ".":
                case "0":
                case "1":
                case "2":
                case "3":
                case "4":
                case "5":
                case "6":
                case "7":
                case "8":
                case "9":
                    addToCalcul(key)
                    break
            }
        }

        document.addEventListener("keydown", onKeyDown)

        return () => {
            document.removeEventListener("keydown", onKeyDown)
        }
    })

    return (
        <div className="calculator">
            {errorMessage && <div><p className="text-danger">{errorMessage}</p></div>}
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
