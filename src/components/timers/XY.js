import React from 'react'
import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import Button from "../generic/Button/Button";
import DisplayTime from "../generic/DisplayTime/DisplayTime";
import Panel from "../generic/Panel";
import { TimerContext } from '../../TimerProvider';
// import Selector from "../generic/Selector/Selector";

const Delete = styled.div`
  display: flex;
  justify-content: right;`;

const XY = ({minutes, seconds, rounds, id}) => {
    // Store the time and button
    const {isRunning, setIsRunning, timers, setTimers} = useContext(TimerContext)
    const [time, setTime] = useState(0);
    // const [min, setMinutes] = useState(null);
    // const [sec, setSeconds] = useState(null);
    // const [rounds, setRounds] = useState(0);
    const [roundsCount, setRoundsCount] = useState(0)

    useEffect(() => {
        let intervalId;

        if (!isRunning && time === 0){
            setTime(minutes+seconds)
            setRoundsCount(rounds)
        }

        if (isRunning && time > 0) {
            // setting time from 0 to 1 every 10 millisecond using javascript setInterval method
            intervalId = setInterval(() => setTime(time - 1), 7);
            }
        else if (isRunning && time === 0 && rounds > 1) {
            setTime(minutes+seconds+99)
            setRoundsCount(roundsCount-1)
            intervalId = setInterval(() => setTime(time - 1), 7);
        }
        if(roundsCount === 0){
            setTime(0)
            setIsRunning(null)
        }
        return () => clearInterval(intervalId);

      }, [isRunning, setIsRunning,time, roundsCount, minutes, seconds, rounds]);

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
    //     }
    // }

    // // Store rounds
    // const handleRounds = e => {
    //     setRoundsCount(e.target.value)
    //     setRounds(e.target.value)
    // }

    // Reset timer
    const reset = () => {
        setIsRunning(null);
        setTime(minutes + seconds);
        setRoundsCount(rounds)
    }

    const remove = () => {
        const newTimersList = timers.filter(timer => timer.id !== id)
        setTimers(newTimersList)
    }

    // // Fast forward (clear) timer
    // const fastForward = () => {
    //     setTime(0)
    //     setRoundsCount(0)
    // }

    // // Show 59 numbers for minutes and seconds
    // const timeNumbersList = [...Array(60).keys()]
    // const timeNumbers = timeNumbersList.map(number =>
    //     <option value={number} key={number}>{number}</option>)

    // // Show max 30 rounds
    // const roundNumbersList = [...Array(31).keys()]
    // const roundNumbers = roundNumbersList.map(number =>
    //     <option value={number} key={number}>{number}</option>)

    return (
        <div className="grid-container">
        <Panel background-color="blue">
            {/* <Selector 
                label="min"
                onChange={e => setMinutes(e.target.value*6000)}
                numbers={timeNumbers}/>
            <Selector 
                label="sec"
                onChange={e => setSeconds(e.target.value*100)}
                numbers={timeNumbers}/>
            <Selector 
                label="rounds"
                onChange={handleRounds}
                numbers={roundNumbers}/> */}
            <Delete>
                <Button 
                    text="-"
                    color={"Default-button Button-danger"}
                    onClick={remove}/>
            </Delete>
            XY: {minutes/6000}m{seconds/100}s for {rounds} rounds
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

export default XY;
