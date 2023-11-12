import { useState, useEffect } from "react";
import Button from "../generic/Button/Button";
import DisplayTime from "../generic/DisplayTime/DisplayTime";
import Panel from "../generic/Panel";
import Selector from "../generic/Selector/Selector";

const Countdown = () => {
    // Store the time and button
    const [isRunning, setIsRunning] = useState(null);
    const [time, setTime] = useState(0);
    const [min, setMinutes] = useState(null);
    const [sec, setSeconds] = useState(null);

    useEffect(() => {
        let intervalId;
        if (isRunning && time > 0) {
            // setting time from 0 to 1 every 10 millisecond using javascript setInterval method
            intervalId = setInterval(() => setTime(time - 1), 10);
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
            setTime(min + sec + 99)
        }
    }

    // Reset timer
    const reset = () => {
        setIsRunning(null);
        setTime(min + sec);
    }

    // Fast forward (clear) timer
    const fastForward = () => {
        setTime(0)
    }

    console.log(time)

    // Show 59 numbers for minutes and seconds
    const timeNumbersList = [...Array(60).keys()]
    const timeNumbers = timeNumbersList.map(number =>
        <option value={number} key={number}>{number}</option>)

    return (
        <div className="grid-container">
        <Panel background-color="blue">
            <Selector 
                label="min"
                onChange={e => setMinutes(e.target.value*6000)}
                numbers={timeNumbers}/>
            <Selector 
                label="sec"
                onChange={e => setSeconds(e.target.value*100)}
                numbers={timeNumbers}/>
            <DisplayTime
                minutes={minutes}
                seconds={seconds}/>
        
            <Button 
                text={isRunning && time !== 0 ? "Pause" : "Start"}
                onClick={startStop}/>
            <Button 
                text="Reset"
                onClick={reset}/>
            <Button 
                text=">>"
                onClick={fastForward}/>
            </Panel>
        </div>
    )
};

export default Countdown;
