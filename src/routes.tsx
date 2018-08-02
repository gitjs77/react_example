import * as React from "react";

import { Router, Route, browserHistory } from 'react-router';

import { Hello } from "./components/Hello";

const App = () => <Router history={ browserHistory }>
    <Route path="/users" component={ Hello }/>
</Router>;

export default App;