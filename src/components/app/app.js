import AppHeader from "../app-header/app-header";
import AppSlider from "../app-slider/app-slider";
import AppFilter from "../app-filter/app-filter";
import ProjectList from "../projects-list/project-list";
import AppNavigation from "../app-navigation/app-navigation";
import './app.css';
import React from "react";

function App() {
    return(
        <div className="app">
            <AppHeader />
            <AppSlider />
            <AppFilter />
            <ProjectList />
            <AppNavigation />
        </div>
    );
}

export default App;