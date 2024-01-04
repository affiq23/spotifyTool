import React from "react";
import "./styles/List.scss";

const List = props => {

    const clicked = e => {
        e.preventDefault();
        props.clicked(e.target.id);
    }

    return ( 
        <div className="list">
            {
                props.items.map((item, idx) => 
                <button key={idx} id={item.track.id}
                    onClick={clicked} className="button"
                >
                    {item.track.name}
                </button>)
            }
        </div>
     );
}
 
export default List;