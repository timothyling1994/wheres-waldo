import './App.css';
import { BrowserRouter,Switch,Route } from "react-router-dom";
import Home from "./components/Home.js";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={()=> (<Home/>)} />
          <Route exact path="/game" render={null} />
          <Route exact path="/leaderboard" render={null} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
