import React from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './App.css';
import SignUpForm from "./pages/signup/SignUpForm";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import PrivateRoute from "./utils/PrivateRoute";
import Account from "./pages/account/Account";
import Gift from "./pages/gift/Gift";
import Event from "./pages/event-large/Event";
import AllEvents from "./pages/all-events/Events";
import ScrollToTop from "./utils/ScrollToTop";
import AddGift from "./pages/create-gift/AddGift";
import Settings from "./pages/settings/Settings";
import TermsAndConditions from "./pages/signup/TermsAndConditions";
import About from "./pages/about/About";
import AddEvent from "./pages/create-event/AddEvent";
import SearchResults from './pages/search-results/SearchResults';
import Header from './header/Header'
import {ToastContainer} from "react-toastify";


function App() {


  return (
          <Router>
              <ScrollToTop/>
              <Header/>
              <div className="App" style={{width: "100%", height:"100%"}}>
                  <Switch>
                      <Route exact path={"/signup"} component={SignUpForm}/>
                      <Route exact path={"/"} component={Home}/>
                      <Route exact path={"/about"} component={About}/>
                      <Route exact path={"/login"} component={Login}/>
                      <Route exact path={"/terms"} component={TermsAndConditions}/>
                      <PrivateRoute exact path={"/account/:id"} component={Account}/>
                      <PrivateRoute exact path ={"/gifts/:id"} component={Gift}/>
                      <PrivateRoute exact path ={"/event/:id"} component={Event}/>
                      <PrivateRoute exact path ={"/events"} component={AllEvents}/>
                      <PrivateRoute exact path={"/addGift"} component={AddGift}/>
                      <PrivateRoute exact path={"/addEvent"} component={AddEvent}/>
                      <PrivateRoute exact path={"/settings"} component={Settings}/>
                      <PrivateRoute exact path={"/search=:id"} component={SearchResults}/>
                  </Switch>
              </div>
              <ToastContainer
                  position="bottom-left"
                  autoClose={1000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
              />
          </Router>
  );
}

export default App;
