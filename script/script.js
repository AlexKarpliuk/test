"use strict"

const weatherBlock = document.querySelector('#weather')

async function loadWeather(e) {
   weatherBlock.innerHTML = `
   <div class="weather__loading">
      <img src="img/giphy.gif" alt="">
   </div>`;

   const server = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=Lviv&appid=42c1c3b7fbd9de4c0b55c98335a56e98';
   const response = await fetch(server, {
      method: 'GET'
   });
   const responseResult = await response.json();
   if (response.ok) {
      getWeather(responseResult);
   } else {
      weatherBlock.innerHTML = responseResult.messge;
   }
}

function getWeather(data){
   console.log(data);
   
   const weatherCity = data.name;
   const weatherStatus = data.weather[0].main;
   const weatherFeels = Math.round(data.main.feels_like)
   const weatherTemp = Math.round(data.main.temp)
   const weatherIcon = data.weather[0].icon;

   const template = 
   `<div class="weather__header">
      <div class="weather__main">
         <div class="weather__city colorCityTemp">${weatherCity}</div>
         <div class="weather__status textcolor">${weatherStatus}</div>
         <div class="weather__temp colorCityTemp">${weatherTemp}</div>
         <div class="weather__feels textcolor">Feels like ${weatherFeels}</div>
      </div>
      <div class="weather__icon">
         <img src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="${weatherIcon}">
      </div>
   </div>`
   weatherBlock.innerHTML = template;
                     
}
   

if(weatherBlock) {
   loadWeather();
}