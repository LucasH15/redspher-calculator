import { Redirect, Route, Switch } from "react-router-dom";
import React from "react";
import Home from "./components/Home";

const App = () => {
    return (
        <Switch>
            <Route path="/" component={Home} />
            <Route render={() => <Redirect to="/" />} />
        </Switch>
    )
}

export default App;
