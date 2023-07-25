import React from "react";
import "./styles/App.scss";
import Main from "./layout/Main";
import Header from "./layout/Header";

const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <Main />
    </div>
  );
};
export default App;
