import React from "react";
import "./App.css";
import SidebarMenu from "./components/SidebarMenu/SidebarMenu";
import ControlPanel from "./components/ControlPanel/ControlPanel";

function App() {
  return (
    <div className="App">
      <React.Fragment>
        <SidebarMenu />
        <ControlPanel />
      </React.Fragment>
    </div>
  );
}

export default App;
