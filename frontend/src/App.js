import "./App.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Link to="/login">Login</Link>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
