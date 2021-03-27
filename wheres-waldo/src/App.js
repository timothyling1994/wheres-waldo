import './App.css';
import {useState} from "react";
import { BrowserRouter,Switch,Route } from "react-router-dom";
import Home from "./components/Home.js";
import Level from "./components/Level.js";

function App() {

  const levelSettings = [
    {
      "imgSrc": "assets/level-one.png",
      "imgSrcCropped":"assets/level-one-cropped.png",
      "findPeople":["SARAH CONNER","MORPHEUS","SONNY"],
      "findPeoplePics":["assets/sarah-conner.png","assets/morpheus.png","assets/sonny.png"],
    },
    {
      "imgSrc": "assets/level-two.png",
      "imgSrcCropped":"assets/level-two-cropped.png",
      "findPeople":["JASON VOORHEES","PICKLE RICK","CHUCKY"],
      "findPeoplePics":["assets/jason-voorhees.png","assets/pickle-rick.png","assets/chucky.png"],
    },
    {
      "imgSrc": "assets/level-three.png",
      "imgSrcCropped":"assets/level-three-cropped.png",
      "findPeople":["TETSUO","BLADE","PRINCESS MONONOKE"],
      "findPeoplePics":["assets/tetsuo.png","assets/blade.png","assets/princess-mononoke.png"],
    }
  ]

  const [currentLevel,setCurrentLevel] = useState(0);

  const setLevel = (level) => {
    setCurrentLevel(level);
  };

  const getLevel = () => {
    return currentLevel;
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={() => (<Home levelSettings={levelSettings} setLevel={setLevel} />)} />
          <Route exact path="/game" render={(props) => (<Level levelSettings={levelSettings} getLevel={getLevel}/>)} />
          <Route exact path="/leaderboard" render={null} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
