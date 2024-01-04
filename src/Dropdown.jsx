import React from "react";
import "./styles/Dropdown.scss"
import { useState, useEffect } from "react";

const Dropdown = props => {

    const [selectedVal, setSelectedVal] = useState("");

    const dropdownChanged = e => {
        props.changed(e.target.value);
    }
    
    return ( 
        <div className="Dropdown">
            <select value={props.selectedVal} onChange={dropdownChanged} className="Dropdown_select">
                {props.options.map((item, idx) => <option key={idx} value={item.id}>{item.name}</option>)}
            </select>
            <p>{selectedVal}</p>
        </div>
     );
}
 
export default Dropdown;