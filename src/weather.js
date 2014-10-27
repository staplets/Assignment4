////Author: Shaun Stapleton
//Date created: 10/23/14
//Last Edited: 10/26/14
//Assignment 4 - 494


//Open weather settings with page
window.onload = function() {
  document.getElementById('cityChoice').value =
    localStorage.getItem('city_store');
  document.getElementById('stateChoice').value =
    localStorage.getItem('state_store');
  if (localStorage.getItem('currTemp_store') === 'true') {
    document.getElementById('currTemp').checked = true;
  }
  if (localStorage.getItem('minTemp_store') === 'true') {
    document.getElementById('minTemp').checked = true;
  }
  if (localStorage.getItem('maxTemp_store') === 'true') {
    document.getElementById('maxTemp').checked = true;
  }
  if (localStorage.getItem('wind_store') === 'true') {
    document.getElementById('windChoice').checked = true;
  }
};

var request = new XMLHttpRequest();
if(!request) {
  alert('Request Error.');
}

//function to take weather from website
function apiWeather() {
  var params = (document.getElementById('cityChoice').value) +
    ',' + (document.getElementById('stateChoice').value);
  //I got this url by adapting one from the weather page
  var url = 'http://api.openweathermap.org/data/2.5/weather?q=' +
    params + '&units=imperial';
  request.onreadystatechange = weatherOutput;
  request.open('GET', url, false);
  request.send();
}

function weatherOutput() {
  var holdCity = document.getElementById('cityOutput');
  var holdState = document.getElementById('stateOutput');
  var holdCurr = document.getElementById('currOutput');
  var holdMax = document.getElementById('maxOutput');
  var holdMin = document.getElementById('minOutput');
  var holdWind = document.getElementById('windOutput');

  var weather = JSON.parse(request.responseText);
  var ctemp = weather.main.temp + 'F';
  var mtemp = weather.main.temp_max + 'F';
  var ltemp = weather.main.temp_min + 'F';
  var windy = weather.wind.speed + ' mph at '
    + (weather.wind.deg) + ' degrees.';

  holdCity.innerHTML = 'City: ' +
    document.getElementById('cityChoice').value;
  holdState.innerHTML = 'State: ' +
    document.getElementById('stateChoice').value;
  if (document.getElementById('currTemp').checked === true) {
    holdCurr.innerHTML = 'Current Temp: ' + ctemp;
  } else {
    holdCurr.innerHTML = 'Current Temp: Unchecked';
  }
  if (document.getElementById('maxTemp').checked === true) {
    holdMax.innerHTML = 'Today\'s High: ' + mtemp;
  } else {
    holdMax.innerHTML = 'Today\'s High: Unchecked';
  }
  if (document.getElementById('minTemp').checked === true) {
    holdMin.innerHTML = 'Today\'s Low: ' + ltemp;
  } else {
    holdMin.innerHTML = 'Today\'s Low: Unchecked';
  }
  if (document.getElementById('windChoice').checked === true) {
    holdWind.innerHTML = 'Wind Speed: ' + windy;
  } else {
    holdWind.innerHTML = 'Wind Speed: Unchecked';
  }
}

//Function to save to local storage
function saveSettings() {
  localStorage.setItem('city_store',
    document.getElementById('cityChoice').value);
  localStorage.setItem('state_store',
    document.getElementById('stateChoice').value);
  localStorage.setItem('currTemp_store',
    document.getElementById('currTemp').checked);
  localStorage.setItem('maxTemp_store',
    document.getElementById('maxTemp').checked);
  localStorage.setItem('minTemp_store',
    document.getElementById('minTemp').checked);
  localStorage.setItem('wind_store',
    document.getElementById('windChoice').checked);
}