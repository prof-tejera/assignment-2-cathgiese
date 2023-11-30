import React from 'react'
import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import Button from "../generic/Button/Button";
import DisplayTime from "../generic/DisplayTime/DisplayTime";
import { TimerContext } from '../../TimerProvider';

const Delete = styled.div`
  display: flex;
  justify-content: right;
`;

const Stopwatch = ({minutes, seconds, id, status}) => {
    // Store the time and button
    const {timers, setTimers, isRunning, nextTimer, isReset} = useContext(TimerContext)
    const [time, setTime] = useState(0);

    // Credit for setInterval & math.floor:
    // https://medium.com/how-to-react/simple-way-to-create-a-stopwatch-in-react-js-bcc0e08e041e

     useEffect(() => {
        let intervalId;

        if (isRunning && status === "running" && time >= 0) {
            intervalId = setInterval(() => {setTime(time + 1)}, 7);
        }
     
        if (isRunning && time === (minutes+seconds) && status === "running") {
            nextTimer()
            setTime(0)
        }

        else if (status === "complete" || isReset){
            setTime(0)
        }

        return () => clearInterval(intervalId);
        
      }, [isReset, isRunning, minutes, nextTimer, seconds, status, time]);

    
    // // Minutes calculation
    const minutesCalc = Math.floor((time % 360000) / 6000);

    // Seconds calculation
    const secondsCalc = Math.floor((time % 6000) / 100);

    const remove = () => {
        const newTimersList = timers.filter(timer => timer.id !== id)
        setTimers(newTimersList)
    }

    return (
        <div className="grid-container">
            <Delete>
                <Button 
                    text="-"
                    color={isRunning ? "hidden":"Default-button Button-danger"}
                    onClick={remove}/>
            </Delete>
            Stopwatch: {minutes/6000}m{seconds/100}s
            <DisplayTime
                minutes={minutesCalc}
                seconds={secondsCalc}
                displayStyle={status === "running" ? "Default-display Running" : (status === "complete" ? "Default-display Complete" : "Default-display")}/>
        </div>
    )
};

export default Stopwatch;
