import React from "react"
import Calculator from "../components/Calculator"

const Home = () => {
    return (
        <>
            <div className="row">
                <h1 className="text-center">Redspher calculator</h1>
            </div>

            <div className="row">
                <Calculator />
            </div>
        </>
    )
}

export default Home
