import "./App.css";
import Board from "./components/board/Board";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Puzzle from "./components/puzzle/Puzzle";

const App = () => (
  <div className="App">
    <div className="game">
      
        <Board />
        <Puzzle />
     
    </div>
  </div>
);

export default App;
