import React from "react";
const List = props => {

    const clicked = e => {
        e.preventDefault();
        props.clicked(e.target.id);
    }

    return ( 
        <div>
            {
                props.items.map((item, idx) => 
                <button key={idx} id={item.track.id}
                    onClick={clicked}
                >
                    {item.track.name}
                </button>)
            }
        </div>
     );
}
 
export default List;