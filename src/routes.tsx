import * as React from "react";

import { Router, Route, browserHistory } from 'react-router';

import { Hello } from "./components/Hello";
import { HelloCaller } from "./components/HelloCaller";
import { ValidationSample } from "./components/ValidationSample";

const App = () => <Router history={ browserHistory }>
    <Route path="/users" component={ Hello }/>
    <Route path="/hello-caller" component={ HelloCaller }/>
    <Route path="/validation" component={ ValidationSample }/>
</Router>;

export default App;