import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import Dropdown from './Dropdown';
import axios from 'axios';

function App() {

  const data = [
    {value: 1, name: "A"},
    {value: 2, name: "B"},
    {value: 3, name: "C"}
]

  const [token, setToken] = useState("")


function Credentials() {
  return {
    ClientId: 'c6973fef14f245c78aad2cdcf66983d9',
    ClientSecret: 'fd0455c45fd849bda7f8f389b0c984a3'
  };
}

const spotify = Credentials();

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
      })
  }, [])


  return (
      <form onSubmit={() => {}}>
          <div className="container">
          <Dropdown options={data} /> 
          <Dropdown options={data} />
          <button type="submit">
            Search
          </button>
          </div>
      </form>
  )
}

export default App
