import React from 'react'
import { useContext } from 'react'
import { useState } from "react";
import Button from "../generic/Button/Button";
import Selector from "../generic/Selector/Selector";
import { TimerContext } from '../../TimerProvider';
import { makeId } from '../../utils/helpers';

const TabataSelect = () => { 

    const {timers, setTimers} = useContext(TimerContext)
    const [work, setWork] = useState(500)
    const [rest, setRest] = useState(500)
    const [rounds, setRounds] = useState(1)
    
    // Show numbers for seconds
    const secNumbersList = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]
     const secNumbers = secNumbersList.map(number =>
            <option value={number} key={number}>{number}</option>)
    
    // Show max 30 rounds
    const roundNumbersList = [...Array(31).keys()]
    const roundNumbers = roundNumbersList.slice(1).map(number =>
        <option value={number} key={number}>{number}</option>)

    return (
        <div className="grid-container">
            <Selector 
                label="sec"
                onChange={e => setWork(e.target.value*100)}
                numbers={secNumbers}/>
            <Selector 
                label="sec"
                onChange={e => setRest(e.target.value*100)}
                numbers={secNumbers}/>
            <Selector 
                label="rounds"
                onChange={e => setRounds(e.target.value*1)}
                numbers={roundNumbers}/>
            <Button 
                text={"Add"}
                color={"Default-button"}
                onClick={() => setTimers(
                    [...timers, 
                    {id: makeId(),
                    work: work,
                    rest: rest,
                    rounds: rounds,
                    type: "tabata",
                    status: "ready"}])}/>
        </div>
    )
};

export default TabataSelect;
