import React from 'react'
import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import Button from "../generic/Button/Button";
import DisplayTime from "../generic/DisplayTime/DisplayTime";
import Panel from "../generic/Panel";
import { TimerContext } from '../../TimerProvider';
// import Selector from "../generic/Selector/Selector";
// import Helpers from '../../utils/helpers';

const Delete = styled.div`
  display: flex;
  justify-content: right;`;

const Countdown = ({minutes, seconds, id, status}) => {
    // Store the time and button
    const {timers, setTimers, isRunning, setIsRunning, nextTimer} = useContext(TimerContext)
    const [time, setTime] = useState(0);

    useEffect(() => {
        let intervalId;
        if (status === "ready") {
            setTime(minutes+seconds)
        }
        if (!isRunning && time === 0){
            setTime(minutes+seconds)
        }
        
        if (isRunning && status === "running" && time > 0) {
            intervalId = setInterval(() => {setTime(time - 1)}, 7);
        }
     
        else if (isRunning && time === 0) {
            clearInterval(intervalId);
            // setIsRunning(null)
            nextTimer()
            // // setTimerIndex(i+1)
            // for (let i = 0; i < timers.length; i++) {
            //     if (timers[i].id === id){
            //         timers[i].status = "complete"
            //         console.log("4 loop timers i", timers[i])
            //         console.log("4 loop timers", timers)
            //     }
            // }
            // console.log("countdown", timers)
            // setTimers(timers)
        }
        return () => clearInterval(intervalId);

      }, [time, minutes, seconds, id, timers, setTimers, status, isRunning, setIsRunning, nextTimer]);

    // Minutes calculation
    const minutesCalc = Math.floor((time % 360000) / 6000);
 
    // Seconds calculation
    const secondsCalc = Math.floor((time % 6000) / 100);

    // // Start and stop timer
    // const startStop = () => {
    //     if (isRunning) {
    //         setIsRunning(null)
    //     } else {
    //         setIsRunning(true)
    //         setTime(minutes + seconds + 99)
    //     }
    // }

    // Reset timer
    const reset = () => {
        setIsRunning(null);
        setTime(minutes + seconds);
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
                    color={"Default-button Button-danger"}
                    onClick={remove}/>
            </Delete>
            Countdown: {minutes/6000}m{seconds/100}s
            <DisplayTime
                minutes={minutesCalc}
                seconds={secondsCalc}/>
        
            {/* <Button 
                text={isRunning && time !== 0 ? "Pause" : "Start"}
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

export default Countdown;
