
import './App.css';
import Header from "./component/layout/Header/Header.js"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import WebFont from "webfontloader"
import React from 'react';
import Footer from "./componenet/layout/Footer/Footer.js"

function App() {
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  },[]);
  
  return (
    <Router>
     <Header/>
     <Footer/>
    </Router> 
  );
  
}

export default App;
