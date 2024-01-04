import React from "react";
import "./styles/Detail.scss";


const Detail = ({album, artists, name}) => {
    return ( 
        <div>
            <div>
                <label className="song-label" htmlFor={name}>{name}</label>
                <br />
                <label className="artist-label" htmlFor={artists[0].name}>{artists[0].name}</label>
            </div>
            <div>
                <img src={album.images[0].url} alt={name} className="image"/>
            </div>
        </div>
     );
}
 
export default Detail;