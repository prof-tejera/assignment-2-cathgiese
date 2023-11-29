import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { TimerContext } from "../TimerProvider";
import { Link } from "react-router-dom";

import Button from "../components/generic/Button/Button";
import Stopwatch from "../components/timers/Stopwatch";
import Countdown from "../components/timers/Countdown";
import XY from "../components/timers/XY";
import Tabata from "../components/timers/Tabata";

const Timers = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: auto auto;
  justify-content: center;
`;

const Timer = styled.div`
  border: 1px solid gray;
  padding: 20px;
  margin: 10px;
  font-size: 1.5rem;
`;

const ControlButtons = styled.div`
  display: grid;
  grid-template-columns: auto;
  align-items: center;
  padding: 20px;
  margin: 10px;
  font-size: 1.5rem;
`;

const TimerTitle = styled.div``;


const TimersView = () => { 
  const {timers, 
        setTimers,
        isRunning,
        setIsRunning } = useContext(TimerContext)
  
  const [timersList, setTimersList] = useState(timers.filter((timer) => timer.status !== "complete"))

  useEffect (() => {
    console.log("timers list", timersList)
    console.log("timers", timers)
    // setTimersList(timers.filter((timer) => timer.status !== "complete"))

    if (isRunning && timers.length > 0) { 
      setTimersList(timersList.filter((timer) => timer.status !== "complete"))
   
      if (timersList.length > 0) {
        timersList[0].status = "running"
      }
    
    }

    // else if (!isRunning && timers.length > 0) {
    //   console.log("error", timersList)
    // }

  }, [timers, setTimers, isRunning, timersList, setTimersList])

  // Start or stop timer
  const startStop = () => {
    if (isRunning) {
        setIsRunning(null)
    } else {
        setIsRunning(true)
    }
  }

  // Restart timer
  const restart = () => {
    timers.map((timer) => timer.status = "ready")
    setTimersList(timers)
  }

  // Fast forward (clear) timer
  // const fastForward = () => {
  //   setTime(0)
  // }

  return (
    <ControlButtons>
      <Link to="/add"><Button text="+ Add timer" color={"Default-button Button-add"} /></Link><br></br>
      <Button 
        text={isRunning ? "Pause timer" : "Start timer"}
        onClick={startStop}
        color={isRunning ? "Default-button Button-danger":"Default-button Button-go"} />
      <Button 
        text={"Skip timer >>"}
        color={"Default-button"} />
      <Button 
        text={"Restart workout"}
        color={"Default-button"}
        onClick={restart} />

    <Timers>
      {timers.map((timer) => (
        <Timer key={`timer-${timer.id}`}>
          <TimerTitle>{timer.title}</TimerTitle>
          {timer.type === "stopwatch" && <Stopwatch 
                                          id={timer.id}
                                          minutes={timer.minutes} 
                                          seconds={timer.seconds}
                                          status={timer.status} />}
          {timer.type === "countdown" && <Countdown 
                                          id={timer.id}
                                          minutes={timer.minutes} 
                                          seconds={timer.seconds}
                                          status={timer.status}/>}
          {timer.type === "xy" && <XY 
                                    id={timer.id}
                                    minutes={timer.minutes} 
                                    seconds={timer.seconds}
                                    rounds={timer.rounds}
                                    status={timer.status}/>}

          {timer.type === "tabata" && <Tabata 
                                        id={timer.id}
                                        work={timer.work} 
                                        rest={timer.rest}
                                        rounds={timer.rounds}
                                        status={timer.status}/>}
        </Timer>
      ))}
    </Timers>
    </ControlButtons>
  );
};

export default TimersView;
