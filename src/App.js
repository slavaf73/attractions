import Homepage from "./pages/Homepage.js";
import ResultPage from "./pages/ResultPage";
import React,{useState} from "react";
import './App.css';
import {Switch, Route, BrowserRouter as Router} from "react-router-dom";

function App() {
    const [coordinates, setCoordinates] = useState(null);

    return (
        <Router>
            <Switch>
                <Route path={'/'} exact><Homepage onUpdate={(crd) => setCoordinates(crd)}/></Route>
                <Route path={'/ResultPage'} exact><ResultPage coordinates={coordinates}/></Route>
            </Switch>
        </Router>
    )
}

export default App;
