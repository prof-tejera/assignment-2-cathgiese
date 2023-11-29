import React from 'react'
import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import Button from "../generic/Button/Button";
import DisplayTime from "../generic/DisplayTime/DisplayTime";
import Panel from "../generic/Panel";
import { TimerContext } from '../../TimerProvider';

const Delete = styled.div`
  display: flex;
  justify-content: right;`;

const Tabata = ({work, rest, rounds, id}) => {
    // Store the time and button
    const {isRunning, setIsRunning, timers, setTimers} = useContext(TimerContext)
    const [time, setTime] = useState(0);
    const [roundsCount, setRoundsCount] = useState(0)
    const [workStatus, setWorkStatus] = useState(null)

    useEffect(() => {
        let intervalId;

        if (!isRunning && time === 0){
            setTime(work)
            setRoundsCount(rounds)
            setWorkStatus(true)
        }

        if (isRunning && time !==0 && roundsCount > 0) {
            // setting time from 0 to 1 every 10 millisecond using javascript setInterval method
            intervalId = setInterval(() => setTime(time - 1), 7);
            }

        if (isRunning && workStatus && time === 0 && roundsCount > 0) {
            setTime(rest+99)
            setWorkStatus(null)
            intervalId = setInterval(() => setTime(time - 1), 7);
        }

        if (isRunning && workStatus === null && time === 0 && roundsCount > 0) {
            setTime(work+99 )
            setWorkStatus(true)
            setRoundsCount(roundsCount-1) 
            intervalId = setInterval(() => setTime(time - 1), 7);
        }
        
        if(roundsCount === 0){
            setTime(0)
            setIsRunning(null)
        }

        return () => clearInterval(intervalId);

      }, [isRunning, setIsRunning, workStatus, time, rounds, work, rest, roundsCount]);
 
    // Seconds calculation
    const seconds = Math.floor((time % 6000) / 100);

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
        setTime(work)
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

    return (
    <div className="grid-container">
        <Panel background-color="blue">
        <Delete>
            <Button 
                text="-"
                color={"Default-button Button-danger"}
                onClick={remove}/>
        </Delete>
        Tabata: {work/100}s work, {rest/100}s rest for {rounds} rounds
        <DisplayTime
            minutes="0"
            seconds={seconds}/>
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

export default Tabata;
