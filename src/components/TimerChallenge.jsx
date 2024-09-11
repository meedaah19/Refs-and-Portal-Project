import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({title, targetTime}){
    const timer = useRef();
    const dialog = useRef();
    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
   // const[timeStarted, setTimeStarted] = useState(false);
    //const[timerExpired, setTimerExpired] = useState(false);

    const timerActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

    if(timeRemaining <= 0){
        clearInterval(timer.current);
        dialog.current.open();
    }

    function handleReset(){
        setTimeRemaining(targetTime * 1000);
    }

    function handleStart(){
       // setTimeStarted(true);

       timer.current =  setInterval(() => {
        setTimeRemaining(prevTimeRemaining => prevTimeRemaining -10);
           // setTimerExpired(true);
         //  dialog.current.open()
        },// targetTime *
        10);
    }
    function handleStop(){
        dialog.current.open();
        clearInterval(timer.current);
    }

    return(
        <>
         <ResultModal ref={dialog} targetTime={targetTime} remainingTime={timeRemaining} onReset={handleReset} />
        <section className="challenge">
            <h2>{title}</h2>
            <p className="challenge-time">
                {targetTime} second{targetTime > 1 ? 's' : ''}
            </p>
            <p>
                <button onClick={timerActive ? handleStop : handleStart}>
                   {timerActive ? 'Stop' : 'Start'}  Challenge
                </button>
            </p>
            <p className={timerActive ? 'active' : ''}>
               {timerActive ? 'Time is running...' : 'Timer inactive'} 
            </p>
        </section>
        </>
    );
}