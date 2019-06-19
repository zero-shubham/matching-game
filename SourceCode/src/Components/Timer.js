import React, {useState, useEffect, useContext} from "react";
import {Context} from "./Game";

const Timer = (props) => {
    const context = useContext(Context);

    const [time, setTime]  = useState("00:00");
    const [interval, setintId] = useState(-1);
    let seconds = 0;
    let minutes = 0;

    useEffect(() => {
        //when a new set of cards/tiles are generated, reset the timer update the page toto show 00:00
        //but don't yet start the timer as the game start only when first card/tile is flipped and activeTiles is set to 0
        if(context.activeTiles===-1 ){

            if(interval!==-1){
                clearInterval(interval);
                setintId(-1);
                seconds=0;
                minutes=0;
            }
            
            setTime((minutes<10?`0${minutes}:`:`${minutes}:` )+ (seconds<10?`0${seconds}`:`${seconds}`))
        }
        if(context.activeTiles===0){
            if(interval === -1){
                let id = setInterval(() => {
                    if(seconds<59){
                        seconds++;
                    }else{
                        minutes++;
                        seconds=0;
                    }
                    setTime((minutes<10?`0${minutes}:`:`${minutes}:` )+ (seconds<10?`0${seconds}`:`${seconds}`))
                }, 1000);
                setintId(id);
            }
        }else if(context.activeTiles===8){
            //when a game ends i.e. all the cards are flipped stop the timer but don't update the page
        //so that the player is able to see the time he took
            clearInterval(interval);
            setintId(-1);
            seconds=0;
            minutes=0;
        }
    },[context.activeTiles])

    return (
        <div className="timer">
            {time}
        </div>
    )
};

export default Timer;