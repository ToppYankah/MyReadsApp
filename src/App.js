import React from "react";
import Home from "./components/Home";
import Search from "./components/Search";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/search" component={Search} />
            <Redirect to="/" />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default BooksApp;
