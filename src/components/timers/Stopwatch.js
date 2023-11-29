import React from 'react'
import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import Button from "../generic/Button/Button";
import DisplayTime from "../generic/DisplayTime/DisplayTime";
import Panel from "../generic/Panel";
import { TimerContext } from '../../TimerProvider';

const Delete = styled.div`
  display: flex;
  justify-content: right;
`;

const Stopwatch = ({minutes, seconds, id, status}) => {
    // Store the time and button
    // const [isRunning, setIsRunning] = useState(null);
    const {isRunning, setIsRunning, timers, setTimers} = useContext(TimerContext)
    const [time, setTime] = useState(0);

    // Credit for setInterval & math.floor:
    // https://medium.com/how-to-react/simple-way-to-create-a-stopwatch-in-react-js-bcc0e08e041e

     useEffect(() => {
        let intervalId;
        if (status === "running") {
            setIsRunning(true)
        }   
        if (isRunning && time <= (minutes + seconds)) {
          // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
          intervalId = setInterval(() => setTime(time + 1), 7);
         }

         if (time >= (minutes + seconds)) {
            // setWorkoutStatus(null);
            setIsRunning(null);
            const timer = timers.filter((timer) => timer.id === id)
            timer[0].status = "complete"
            clearInterval(intervalId);
        }
        return () => clearInterval(intervalId);
        
      }, [isRunning, setIsRunning, time, minutes, seconds, id, status, timers]);

    
    // // Minutes calculation
    const minutesCalc = Math.floor((time % 360000) / 6000);

    // Seconds calculation
    const secondsCalc = Math.floor((time % 6000) / 100);

    // // Start and stop timer
    // const startStop = () => {
    //     if (isRunning) {
    //         setIsRunning(null)
    //     } else {
    //         setIsRunning(true)
    //     }
    // }

    const reset = () => {
        setIsRunning(null);
        setTime(0);
    }

    const remove = () => {
        const newTimersList = timers.filter(timer => timer.id !== id)
        setTimers(newTimersList)
    }

    // // Fast forward (clear) timer
    // const fastForward = () => {
    //     setTime(0)
    // }
    
    return (
        <div className="grid-container">
        <Panel background-color="blue">
            <Delete>
                <Button 
                    text="-"
                    color={isRunning ? "hidden":"Default-button Button-danger"}
                    onClick={remove}/>
            </Delete>
            Stopwatch: {minutes/6000}m{seconds/100}s
            <DisplayTime
                minutes={minutesCalc}
                seconds={secondsCalc}/>
        
            {/* <Button 
                text={isRunning ? "Pause" : "Start"}
                onClick={startStop}/> */}
            <Button 
                text="Reset"
                onClick={reset}
                color={"Default-button"}/>
            {/* <Button 
                text=">>"
                onClick={fastForward}/> */}
        </Panel>
        </div>
    )
};

export default Stopwatch;
