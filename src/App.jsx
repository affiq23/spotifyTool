import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import Dropdown from './Dropdown';
import List from './List';
import axios from 'axios';

function Credentials() {
  return {
    ClientId: 'c6973fef14f245c78aad2cdcf66983d9', // taken from Spotify for Developers website
    ClientSecret: 'fd0455c45fd849bda7f8f389b0c984a3'
  };
}

function App() {

  const [token, setToken] = useState("");
  const [genres, setGenres] = useState({selectedGenre: "", listGenresAPI: []});
  const [playlist, setPlaylist] = useState({selectedPlaylist: "", listPlaylistAPI: []});
  const [tracks, setTracks] = useState({selectedTrack: "", listTrackAPI: []});
  const [trackDetail, setTrackDetail] = useState(null);
  const spotify = Credentials();

  const data = [
    {value: 1, name: "A"},
    {value: 2, name: "B"},
    {value: 3, name: "C"}
]

  

  useEffect(() => {
    axios("https://accounts.spotify.com/api/token", {
      headers: {
        "Content-Type" : "application/x-www-form-urlencoded",
        "Authorization" : "Basic " + btoa(spotify.ClientId + ":" +spotify.ClientSecret)
      }, 
      data: "grant_type=client_credentials",
      method: "POST"
    })
      .then(tokenRes => {
        console.log("tokenResponse.data.access_token");
        setToken(tokenRes.data.access_token);

        axios("https://api.spotify.com/v1/browse/categories?locale=sv_US", {
          method: "GET",
          headers: { "Authorization" : "Bearer " + tokenRes.data.access_token}
        })
          .then(genreRes => {
            setGenres({
              selectedGenre: genres.selectedGenre,
              listGenresAPI: genreRes.data.categories.items
            })
          })
      })
  }, [genres.selectedGenre, spotify.ClientId, spotify.ClientSecret]);

  const genreChanged = val => {
    setGenres({
      selectedGenre : val,
      listGenresAPI: genres.listGenresAPI
    })
    axios(`https://api.spotify.com/v1/browse/categories/${val}/playlists?limit=10`, {
      method: "GET",
      headers: { "Authorization" : "Bearer " + token}
  }) 
    .then(playlistRes => {
      setPlaylist({
        selectedPlaylist: playlist.selectedPlaylist,
        listPlaylistAPI: playlistRes.data.playlists.items
      });
    })
    console.log(val);
  };

    const playlistChanged = val => {
      console.log(val);
      setPlaylist({
        selectedPlaylist: val,
        listPlaylistAPI: playlist.listPlaylistAPI
      })
    }

    const buttonClicked = e => {
      e.preventDefault();

      axios(`https://api.spotify.com/v1/playlists/${playlist.selectedPlaylist}/tracks?limit=10`, {
        method: "GET",
        headers: { "Authorization" : "Bearer " + token}
      })
        .then(trackRes => {
          setTracks({
            selectedTrack: tracks.selectedTrack,
            listTrackAPI: trackRes.data.items
          })
        })
    }

    const listClicked = val => {
      const currentTracks = [...tracks.listTrackAPI];
      const trackInfo = currentTracks.filter(t => t.track.id === val);
      setTrackDetail(trackInfo[0].track);
    }

  return (
      <form onSubmit={buttonClicked}>
          <div className="container">
          <Dropdown options={genres.listGenresAPI} selectedVal={genres.selectedGenre} changed={genreChanged} /> 
          <Dropdown options={playlist.listPlaylistAPI} selectedVal={playlist.selectedPlaylist} changed={playlistChanged} />
          <button type="submit">
            Search
          </button>
          <List items={tracks.listTrackAPI} clicked={listClicked} />
          </div>
      </form>
  )
}

export default App
