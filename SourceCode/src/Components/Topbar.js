import React, {useState, useEffect, useContext} from "react";

import {Context} from "./Game";
import Timer from "./Timer";

import refresh from "../assets/svgs/refresh-arrow.svg";
import star from "../assets/svgs/star.svg";
import starFilled from "../assets/svgs/star-filled.svg";

const Topbar = (props) => {
    const context = useContext(Context);

    const [stars, setStars] = useState([]);
    let list = [];
    const generateStars = (amt) => {
        let dif = 3-amt;
        while(amt>0){
            list.push (<img src={starFilled} alt="filled star icon specifying current level" key={`${amt}-filled`}/>)
            amt--;
        }
        while(dif>0){
            list.push (<img src={star} alt="unfilled star" key={`${dif}-unfilled`}/>)
            dif--;
        }
        setStars(list);
    }

    useEffect(() => {
        generateStars(context.level);
    }, [context.level])

    return (
        <div className="topbar">

            <div className="level">
            {
                stars
            }
            </div>

            <Timer/>
            {props.moves} Moves
            <img src={refresh} 
            alt="click to restart game"
            className="topbar__refreshBtn"
            onClick={()=> context.generateTiles()}
            />
        </div>
    )
};

export default Topbar;