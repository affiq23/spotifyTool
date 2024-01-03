import React from "react";
import { useState, useEffect } from "react";

const Dropdown = props => {

    const [selectedVal, setSelectedVal] = useState("");

    const dropdownChanged = e => {
        props.changed(e.target.value);
    }
    
    return ( 
        <div>
            <select value={props.selectedVal} onChange={dropdownChanged}>
                {props.options.map((item, idx) => <option key={idx} value={item.id}>{item.name}</option>)}
            </select>
            <p>{selectedVal}</p>
        </div>
     );
}
 
export default Dropdown;