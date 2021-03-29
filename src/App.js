import { render } from '@testing-library/react';
import React, { Component, useState, useEffect } from 'react';
import './App.css';

function App() {
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

  return (
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

export default App;
