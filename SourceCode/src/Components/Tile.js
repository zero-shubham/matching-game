import React, {useState,useEffect, useContext} from "react";
import {Context} from "./Game";

const Tile = (props) => {
    //dispatched from parent
    const context = useContext(Context);

    //local state, storing class for the tile div
    const [activeClass,setActiveClass] = useState("tile-inner");

    //remove active class flips back the tile, everytime class is removed it signals end of one turn reset the turn
    const removeActiveClass = () => {
        context.dispatch({
            type: "RESET_TURN",
            flag: false
        })
        setActiveClass("tile-inner");setActiveClass("tile-inner");
    };

    // store previous and current tile id
    const addActiveClass = () => {
        context.dispatch({
            type: "SET_PREV_CUR_TILE",
            curTile: props.id
        })
        setActiveClass("tile-inner active");
    };

    //everytime card is to be removed delay it by 0.4secs, this useeffect is triggered by triggerRemove
    useEffect(()=>{
        setTimeout(() => {
            if(context.triggerRemove){
                if(props.id===context.prevTile || props.id===context.curTile){
                    removeActiveClass();
                }
            }
        },400)
    }, [context.triggerRemove])


    //as generating tiles everytime with different position in randomised order was impossible(practically)
    //so forced update everytime a new list of tiles were generated
    useEffect(() => {
        setActiveClass("tile-inner");
    },[props.toForceUpdate])

    return (
        <div className="tile">
            <div className={activeClass}
            onClick={()=>{
                if(context.activeTiles === -1){
                    context.dispatch({type:"SET_TIMER", timer: 0})
                }
                /*prevTile is undefined beginning of a turn and also on first click, it is set only after second click of a turn.
                this nullifies extra clicks, when in an ongoing turn only 2 clicks are allowed per turn */
                if(!context.prevTile && activeClass!=="tile-inner active"){
                    addActiveClass()
                }
                    
            }}>
                <div className="tile-front">
                </div>
                <div className="tile-back">
                    <img src={props.svg} alt={props.alt} />
                </div>
                
            </div>
        </div>
    )
};

export default Tile;