import React, {useEffect, useReducer} from 'react';

import Topbar from "./Topbar";
import Tile from "./Tile";
import appReducer from "../reducer/appReducer";

import {allSvgs} from "../assets/allSvgs";

export const Context = React.createContext();

const Game = (props) => {
    //state related to tiles only
    const [state, dispatch] = useReducer(appReducer,{
        tiles:[], 
        prevTile:"", 
        curTile:"",
        triggerRemove:false, 
        moves:0,
        level: 3,
        toForceUpdate: true,
        activeTiles: -1
    })

    //function that generates a randomised list of tiles component
    const generateTiles = () => {

        let arr = [1,2,8,2,5,4,3,1,7,6,3,8,7,6,5,4];
        let tmpTiles = []
        while(arr.length){
            let svgId = arr.splice(Math.floor(Math.random()*arr.length), 1)[0];
            tmpTiles.push(
                <Tile 
                key={`${arr.length + 1}-${allSvgs[svgId].type}`}
                id={`${arr.length + 1}-${allSvgs[svgId].type}`}
                svg={allSvgs[svgId].svg} 
                alt={`${allSvgs[svgId].type} icon tile`}
                toForceUpdate={state.toForceUpdate}
                />
            )
        }
        dispatch({
            type: "SET_TILES",
            tiles: tmpTiles
        });
    }

    //trigger flip if needed on prevTile change
    useEffect(() => {
        /*since this useEffect is called on change of both prevTile and curTile,
         only thing to check is that none them are undefined*/
        if(state.prevTile && state.curTile){
            //if the tiles are of different type, flip back both
            if(state.prevTile.split('-')[1] !== state.curTile.split('-')[1]){
                dispatch({
                    type: "SET_TILE_REMOVE_FLAG",
                    flag: true
                })
            }else{//else let them be flipped active and start a new turn
                dispatch({
                    type: "RESET_TURN",
                    flag: false
                })
                //made reducer only for incrementing cause, reduction of levels coincided with "SET_TILE_REMOVE_FLAG" reducer
                //both were dispatched once at same condition. >>less code is always good, but then will decouple these two if needed<<
                dispatch({type:"INCREMENT_LEVEL"})
            }
            dispatch({type:"INCREMENT_MOVES"});
        }
    }, [state.prevTile])

    //this useEffect runs only once, initial render
    useEffect(() => generateTiles(), []);


    //provide dispatch, prevTile, curTile and triggerRemove across all childs
    return (
        <Context.Provider value={{
            dispatch,
            prevTile: state.prevTile,
            curTile: state.curTile,
            triggerRemove: state.triggerRemove,
            generateTiles: generateTiles,
            level: state.level,
            activeTiles: state.activeTiles
        }}>
            <div className="game">
                <h1>Matching Game</h1>
                <Topbar moves={state.moves}/>

                <div className="gamepad">
                    {state.tiles}
                </div>
            </div>
        </Context.Provider>
    )
};
export default Game;