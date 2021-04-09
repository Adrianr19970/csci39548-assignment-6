import { render } from '@testing-library/react';
import React, { Component, useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  {/*---------- github mini app ----------*/}
  function GithubDisplay(){
    let [userInfo, setUserInfo] = useState({});
    let [inputValue, setInputValue] = useState("");
    let onChange = (event) => {
      setInputValue(event.target.value);
    };
  
    useEffect(() => {
      getUserInfo();
    },
    []);
  
    let getUserInfo = async() => {
      let response = await fetch("https://api.github.com/users/" + inputValue);
      let info = await response.json();
  
      setUserInfo(info);
    };
	  return(
	  <div className="App">
      <div className="header">
        <h1>GitHub User Search</h1>
      </div>
        <div id="display">
          <div id="searchBar">
            <label>Enter a GitHub Username: </label>
              <input
                type = "text"
                id = "search"
                value = {inputValue}
                onChange = {onChange}
              />
              <button id="searchButton" onClick={getUserInfo}>Search</button>
          </div>
          <div id="displayInfo">
            <h3>Username: {userInfo.login}</h3>
            <h3>Name: {userInfo.name}</h3>
            <h3>Location: {userInfo.location}</h3>
            <h3>User Since: {userInfo.created_at}</h3>
            <h3>Link to Profile: {userInfo.html_url}</h3>
            <h3>Number of Public Repositories: {userInfo.public_repos}</h3>
          </div>
        </div>
    </div>
	);
  }
  
 {/*----------lyrics mini app----------*/}
  function LyricsDisplay(){
    const[artist, setArtist]= useState("");
    const[title, setTitle]= useState("");
    const[lyrics, setLyrics]=useState("No Results");

    function titleChange(event){
      setTitle(event.target.value);
    }

    function artistChange(event){
      setArtist(event.target.value);
    }

  {/*handles search*/} 
    async function lyricsChange(){
      try{
        let response = await axios.get("https://api.lyrics.ovh/v1/"+artist+"/"+title);
        setLyrics(newlineText(response.data.lyrics));
        console.log(title, artist, response);
      }catch(error){
        if(error.response){
          console.log("DOG!!");
         console.log(error.response.data);
         setLyrics("No results. Title or Artist may be misspelled.")
        }
      }
    }


    {/*proper formatting for song, creates array of paragraphs based on where newline characters are 
    (i stole this from https://forum.freecodecamp.org/t/newline-in-react-string-solved/68484)*/}
    function newlineText(text) {
      const newText = text.split('\n').map(str => <p>{str}</p>);
      return newText;
    }
    
	return(
	  <div className="App">
      <div className="lyricsheader">
        <h1>Lyrics Search</h1>
      </div>
        <div id="display">
          <div id="searchBar">
            <label>Enter Song Title: </label>
              <input
                type = "text"
                id = "search"
                onChange={titleChange}
              />
            <label> Enter Artist: </label>
            <input 
            type = "text"
            id= "search"
            onChange={artistChange}
            ></input>
              <button id="searchButton" onClick={lyricsChange}>Search</button>
          </div>
          <div id="displayInfo">
            <p>
              {lyrics}
			      </p>
          </div>
        </div>
      </div>
	);
  }



  
  
  {/*all "mini apps" get put into returnArray*/}
	let returnArray= [GithubDisplay(), LyricsDisplay()];
  return (
	returnArray
  );
}

export default App;
