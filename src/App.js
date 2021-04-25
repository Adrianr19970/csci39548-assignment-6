import { render } from '@testing-library/react';
import React, { Component, useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  /*---------- github mini app ----------*/
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
  
 /*----------lyrics mini app----------*/
  function LyricsDisplay(){
    const[artist, setArtist]= useState("");
    const[title, setTitle]= useState("");
    const[lyrics, setLyrics]=useState(<h3>No results</h3>);

    function titleChange(event){
      setTitle(event.target.value);
    }

    function artistChange(event){
      setArtist(event.target.value);
    }

  /*handles search*/
    async function lyricsChange(){
      try{
        let response = await axios.get("https://api.lyrics.ovh/v1/"+artist+"/"+title);
        setLyrics(newlineText(response.data.lyrics));
      }catch(error){
        if(error.response){
         console.log(error.response.data);
         setLyrics("No results. Title or Artist may be misspelled.")
        }
      }
    }


    /*proper formatting for song, creates array of paragraphs based on where newline characters are 
    (i stole this from https://forum.freecodecamp.org/t/newline-in-react-string-solved/68484)*/
    function newlineText(text) {
      const newText = text.split('\n').map(str => <h3>{str}</h3>);
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

  /*---------- weather mini app ---------- */
  function WeatherDisplay(){
    const [weather, setWeather]= useState("");
    const [city, setCity]= useState("");
    const [found, setFound]= useState(false);


    function cityChange(event){
      setCity(event.target.value);
    }

    /*changes weather state*/
    async function weatherChange(){
      try{
        let response = await axios.get("https://goweather.herokuapp.com/weather/"+city);
        setWeather(response.data);
        setFound(true);
      }catch(error){
        if(error.response){
         console.log(error.response.data);
         setFound(false)
        }
      }
    }

    return(
      <div className="App">
      <div className="weatherheader">
        <h1>Weather</h1>
      </div>
        <div id="display">
          <div id="searchBar">
            <label>City </label>
              <input
                type = "text"
                id = "search"
                onChange = {cityChange}
              />
              <button id="searchButton" onClick={weatherChange}>Search</button>
          </div>
          <div id="displayInfo">
            {found ? 
            <div>
            <h3>City: {city}</h3>
            <h3>Temperature: {weather.temperature}</h3>
            <h3>Wind: {weather.wind}</h3>
            <h3>{weather.description}</h3>
            </div>
            : <h3>No results</h3>}
          </div>
        </div>
    </div>
    );
  }

  /* COVID Cases Mini - App - Anyeli*/
  //Using GET /vaccines endpoint from https://github.com/M-Media-Group/Covid-19-API
  function CovidDisplay(){
    let [countryInfo, setCountryInfo] = useState({}); //countryInfo is the vaccine data for country
    let [inputValue, setInputValue] = useState(""); //inputValue is the country the user entered
    const [found, setFound]= useState(false); //whether the country is found or not
    let onChange = (event) => {
      setInputValue(event.target.value);
    }; 
  
    useEffect(() => {
      getVaccineInfo();
    },
    []); //this calls getvaccine info when search button is clicked
  
   
    let getVaccineInfo = async() => {
      /*In the API, it says country is case sensitive, this attempts to fix errors in inputValue
      Example of country names: venezuela, UNITED STATES, ColOmbia, Trinidad and Tobago
      */
      let editedInput = inputValue.toLowerCase(); //Everything is lower case 

      /*
      The following way to capitalize each word is an edited version of
      https://stackoverflow.com/questions/47405920/how-to-capitalize-first-letter-of-each-word-in-input-type-text
      */
      editedInput= editedInput.split(' ').map(eachWord=>
        eachWord.charAt(0).toUpperCase() + eachWord.slice(1)
      ).join(' '); //Each word is split by spaces and for each word, the first char is capitalized 

      //Every word is capitalized - but this is a problem if the country has an and in it
      if(editedInput.indexOf(" And ")!==-1) //if there's an And  (ex: Trinidad And Tobago)
      {
        //Get the word before the And
        let wordBefore = editedInput.substring(0,editedInput.indexOf(" And ")); //word before And - ex: Trinidad
        let wordAfter = editedInput.slice(editedInput.indexOf(" And ")+5); //word after And - ex: Tobago
        editedInput=wordBefore+" and "+wordAfter; //ex:Trinidad and Tobago
      }

      inputValue = editedInput; //locally so that it can be fetched correctly
      setInputValue(editedInput); //globally so that the input in the search area gets changed
      //console.log(inputValue);
      

      //This uses the covid api vaccines endpoint to return information for all countries
      let response = await fetch("https://covid-api.mmediagroup.fr/v1/vaccines?"); 
      let info = await response.json(); //this has info updated hourly about vaccines 
      //console.table(info['United States'].All);
      //console.table(info[inputValue].All);
      
      //The JSON response doesn't handle errors if a country was entered wrong
      try {
        setCountryInfo(info[inputValue].All); //but if this gives an error, country was entered wrong (or nothing has been entered)
        setFound(true); //country has been found, so the data can be displayed
      }
      catch(error){
        console.error();
        setFound(false); //country has not been found, so display no results
      }
      // console.table(countryInfo);
    };
    
	  return(
	  <div className="App">
      <div className="vaccineHeader">
        <h1> COVID Vaccine Data For Countries</h1>
      </div>
        <div id="display">
          <div id="searchBar">
            <label>Enter a country: </label>
              <input
                type = "text"
                id = "search"
                value = {inputValue}
                onChange = {onChange}
              />
              <button id="searchButton" onClick={getVaccineInfo}>Search</button> {/* once search is clicked, get vaccine info*/}
          </div>
          <div id="displayInfo"> {/* if country is found, display date - if not, display no results*/}
          {found ? 
            <div>
            <h3>Country: {inputValue}</h3>
            <h3>Vaccines Administered: {countryInfo.administered}</h3>
            <h3>People Partially Vaccinated: {countryInfo.people_partially_vaccinated}</h3>
            <h3>People Fully Vaccinated: {countryInfo.people_vaccinated}</h3>
            <h3>When This Info Was Last Updated (YYYY/MM/DD): {countryInfo.updated}</h3>
            </div>
            : <h3>No results</h3>}
          </div>
        </div>
    </div>
	);
  }
  return (
	<div>
    <GithubDisplay />
    <LyricsDisplay/>
    <WeatherDisplay/>
    <CovidDisplay/>
  </div>
  );
}

export default App;