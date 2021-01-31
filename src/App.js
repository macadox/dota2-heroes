import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useGlobalContext } from "./context";

// Pages
import Home from "./pages/Home";
import HeroPage from "./pages/HeroPage";
import Error from "./pages/Error";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/hero/:id' children={<HeroPage />}></Route>
        <Route path='*'>
          <Error />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
