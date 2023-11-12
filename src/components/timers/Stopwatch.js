import { useState, useEffect } from "react";
import Button from "../generic/Button/Button";
import DisplayTime from "../generic/DisplayTime/DisplayTime";
import Panel from "../generic/Panel";
import Selector from "../generic/Selector/Selector";

const Stopwatch = () => {
    // Store the time and button
    const [isRunning, setIsRunning] = useState(null);
    const [time, setTime] = useState(0);
    const [min, setMinutes] = useState(null);
    const [sec, setSeconds] = useState(null);

    // Credit for setInterval & math.floor:
    // https://medium.com/how-to-react/simple-way-to-create-a-stopwatch-in-react-js-bcc0e08e041e
    useEffect(() => {
        let intervalId;
        if (isRunning && time !== min + sec) {
          // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
          intervalId = setInterval(() => setTime(time + 1), 10);
        }
        return () => clearInterval(intervalId);
        
      }, [isRunning, time, min, sec]);

    // Minutes calculation
    const minutes = Math.floor((time % 360000) / 6000);

    // Seconds calculation
    const seconds = Math.floor((time % 6000) / 100);

    // Start and stop timer
    const startStop = () => {
        if (isRunning) {
            setIsRunning(null)
        } else {
            setIsRunning(true)
        }
    }
    console.log(isRunning, time)

    const reset = () => {
        setIsRunning(null);
        setTime(0)
    }

    // Show 59 numbers for minutes and seconds
    const numbersList = [...Array(60).keys()]
    const numbers = numbersList.map(number =>
        <option value={number} key={number}>{number}</option>)
    
    return (
        <div className="grid-container">
        <Panel background-color="blue">
            <Selector 
                label="min"
                onChange={e => setMinutes(e.target.value*6000)}
                numbers={numbers}/>
            <Selector 
                label="sec"
                onChange={e => setSeconds(e.target.value*100)}
                numbers={numbers}/>
            <DisplayTime
                minutes={minutes}
                seconds={seconds}/>
        
            <Button 
                text={isRunning ? "Pause" : "Start"}
                onClick={startStop}/>
            <Button 
                text="Reset"
                onClick={reset}/>
        </Panel>
        </div>
    )
};

export default Stopwatch;
