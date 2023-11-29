import React from "react";
import { useState } from "react";

export const TimerContext = React.createContext({});

const TimerProvider = ({ children }) => {
    const [timers, setTimers] = useState([]);

    // console.log('timers', timers)

    const [isRunning, setIsRunning] = useState(null);
    // const [timerStatus, setTimerStatus] = useState(null);
    // const [workoutStatus, setWorkoutStatus] = useState(null);

    const [time, setTime] = useState(0);
    // Current running timer
    const [activeTimerIndex, setActiveTimerIndex] = useState(0); 
    // const [min, setMinutes] = useState(null);
    // const [sec, setSeconds] = useState(null);
    
    const nextTimer = () => {
        console.log("active index", activeTimerIndex, "timers", timers)
        timers[activeTimerIndex].status = "complete"
        setActiveTimerIndex(activeTimerIndex+1)
        setTimers(timers)
    }

    return (
        <TimerContext.Provider
            value={{
                // functions go here
                timers,
                setTimers,
                isRunning,
                setIsRunning,
                time,
                setTime,
                activeTimerIndex,
                setActiveTimerIndex,
                nextTimer
                // workoutStatus,
                // setWorkoutStatus
            }}
        >{children}</TimerContext.Provider>
    )
};

export default TimerProvider