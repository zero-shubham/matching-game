import ReactDOM from 'react-dom';
import React from 'react';

import Game from "./Components/Game";

import "./styles/normalize.css";
import "./styles/styles.scss";

const jsx = (
    <div>
        <Game/>
    </div>
)
ReactDOM.render(jsx, document.getElementById("root"));