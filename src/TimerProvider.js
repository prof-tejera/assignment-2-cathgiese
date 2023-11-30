import React from "react";
import { useState } from "react";

export const TimerContext = React.createContext({});

const TimerProvider = ({ children }) => {
    const [timers, setTimers] = useState([]);
    const [isRunning, setIsRunning] = useState(null);
    const [totalTime, setTotalTime] = useState(0);
    const [isReset, setIsReset] = useState(null)

    // Current running timer
    const [activeTimerIndex, setActiveTimerIndex] = useState(0); 
    
    const totalTimeCalc = () => {
        const totalMin = timers.map((timer) => timer.minutes)
        totalMin.forEach((val) => setTotalTime(totalTime+val))

        const totalSec = timers.map((timer) => timer.seconds)
        totalSec.forEach((val) => setTotalTime(totalTime+val))
    }
    
    const nextTimer = () => {
        if (activeTimerIndex === timers.length-1) {
            timers[activeTimerIndex].status = "complete"
            setTimers(timers)
            restart()
        }
        else {
            timers[activeTimerIndex].status = "complete"
            timers[activeTimerIndex+1].status = "running"
            setActiveTimerIndex(activeTimerIndex+1)
            setTimers(timers)
        }
    }

    // Restart timer
    const restart = () => {
        setIsReset(true)
        setIsRunning(null)
        setActiveTimerIndex(0)
        timers.map((timer) => timer.status = "ready")
        timers[0].status = "running"
        setTimers(timers)
    }

    // Start or stop timer
    const startStop = () => {
        if (isRunning) {
            setIsRunning(null)
        } else {
            setIsRunning(true)
            setIsReset(null)
        }
    }

    return (
        <TimerContext.Provider
            value={{
                timers,
                setTimers,
                isRunning,
                setIsRunning,
                totalTime,
                setTotalTime,
                totalTimeCalc,
                activeTimerIndex,
                setActiveTimerIndex,
                nextTimer,
                restart,
                startStop,
                isReset,
                setIsReset,
            }}
        >{children}</TimerContext.Provider>
    )
};

export default TimerProvider