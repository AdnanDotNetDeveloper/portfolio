import React from "react";
import "./App.scss";
import Main from "./containers/Main";
import CursorEffect from "./components/cursorEffect/CursorEffect";

function App() {
  return (
    <div className="App">
      <CursorEffect />
      <Main />
    </div>
  );
}

export default App;
