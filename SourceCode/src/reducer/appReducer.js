const appReducer = (state, action) =>  {
    switch (action.type){
        case "SET_TILES":
            let x = !state.toForceUpdate;
            return {
                ...state,
                prevTile:"", 
                curTile:"",
                tiles: action.tiles,
                moves: 0,
                level: 3,
                toForceUpdate: x,
                activeTiles:-1
            }
        case "SET_PREV_CUR_TILE":
            let prev = state.curTile;
            return {
                ...state,
                prevTile: prev,
                curTile: action.curTile
            }
        case "RESET_TURN":
            return {
                ...state,
                prevTile: undefined,
                curTile: undefined,
                triggerRemove: action.flag
            }
        case "SET_TILE_REMOVE_FLAG":
            let oldLevel = state.level;
            return {
                ...state,
                triggerRemove: action.flag,
                level: oldLevel>0?oldLevel - 1:0
            }
        case "INCREMENT_MOVES":
            let prevMoves = state.moves;
            return {
                ...state,
                moves: prevMoves+1
            }
            //using below reducer for incrementing number of tiles active at present
        case "INCREMENT_LEVEL":
            oldLevel = state.level;
            let oldActive = state.activeTiles;
            return {
                ...state,
                level: oldLevel<3?oldLevel+1:3,
                activeTiles: oldActive+1
            }
        case "SET_TIMER":
            return {
                ...state,
                activeTiles:action.timer
            }
        default:
            return state;
    }

};

export default appReducer;