import { Redirect, Route, Switch } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";

const App = () => {
    return (
        <div className="container-fluid py-2">
            <Switch>
                <Route path="/" component={Home} />
                <Route render={() => <Redirect to="/" />} />
            </Switch>
        </div>
    )
}

export default App;
