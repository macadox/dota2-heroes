import "./App.css";
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Loader
import Loader from "./pages/common/Loading";

// Pages
const Home = lazy(() => import("./pages/Home"));
const HeroPage = lazy(() => import("./pages/HeroPage"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/hero/:id' children={<HeroPage />}></Route>
          <Route path='*'>
            <ErrorPage />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
