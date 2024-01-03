import React from "react";
import { useState } from "react";

const Dropdown = props => {

    const [selectedVal, setSelectedVal] = useState("");
    
    return ( 
        <div>
            <select value={selectedVal} onChange={e => setSelectedVal(e.target.value)}>
                {props.options.map((item, idx) => <option key={idx} value={item.value}>{item.name}</option>)}
            </select>
            <p>{selectedVal}</p>
        </div>
     );
}
 
export default Dropdown;