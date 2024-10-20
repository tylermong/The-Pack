'use client'

import Jumbotron from "../components/Jumbotron";

//CHANGE THE FORMAT BACKGROUND HAS TO BE A FADED PACK LOGO THEN IN THE MIDDLE
// IS A JUMBOTRON WELCOMING PEOPLE AND SMALLER TEXT SHOULD EXPLAIN WHAT IT IS OR SOMETHING ELSE
// UNDER THE JUMBOTRON IS TWO BUTTONS ONE FOR LOGIN AND THE OTHER FOR REGISTER

export default function Landing() {
  return (
    <div className="container">
      <div className="background"></div>
      <div className="jumbotron">
        <Jumbotron/>
      </div>
    </div>
  );
};  