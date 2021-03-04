var searchBtn = document.getElementById('searchbtn');
var clearBtn = document.getElementById('clear-history');
var searchHistoryEl = document.getElementById('search-history');
var cityEl = document.getElementById('city');
var tempEl = document.getElementById('temp');
var humidityEl = document.getElementById('humidity');
var windEl = document.getElementById('wind');
var uvEL = document.getElementById('UV');
var currentIcon = document.getElementById('current-icon');
var fiveDay = document.getElementById('fiveDay');
var uvVal = document.getElementById('UVval');
var dataFiveDay;
var currentData;
var searchInputVal;
var uvIndex;

// Function to handle saving user input value for the city name and saving it to local storage
function handleSearchFormSubmit(event) {
    event.preventDefault();
  
    searchInputVal = document.querySelector('#searchinput').value;
    console.log(historyArr)
    if(historyArr.indexOf(searchInputVal) === -1){
        historyArr.push(searchInputVal);
        localStorage.setItem('history', JSON.stringify(historyArr));
        displayHistory(searchInputVal);
    }
    if (!searchInputVal) {
      console.error('You need a search input value!');
      return;
    }

    console.log(searchInputVal);
   
    getApi(searchInputVal);
}

// Function to get API based on user's city name input
function getApi(city) {
    
    var weatherApi = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=41f0b59a1e00c5b966c2d7bde52a04f5&units=imperial";
    var currentApi = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=41f0b59a1e00c5b966c2d7bde52a04f5&units=imperial";
    console.log(weatherApi);

    cityEl.innerHTML = "";
    fiveDay.innerHTML = "";
    tempEl.innerHTML = "";
    humidityEl.innerHTML = "";
    windEl.innerHTML = "";

    fetch(weatherApi)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }
            console.log(response);
            return response.json();
        })
        // Handles the five day data and loops through the list array and assigns to variables in order to display onto page.
        .then(function(data) {
            dataFiveDay = data;

            for (i = 4; i < dataFiveDay.list.length; i+=8) {
                var card = document.createElement("div");
                card.classList.add("col", "bg-primary", "five", "text-white", "ml-3", "mb-3", "rounded")

                var date = document.createElement("h2")
                var dateFive = data.list[i].dt_txt;
                date.textContent = new Date(dateFive).toLocaleDateString();
                
                var temp = document.createElement("p")
                var tempFive = data.list[i].main.temp;
                temp.textContent = "Temp: " + tempFive + " ℉";

                var humid = document.createElement("p")
                var humidFive = data.list[i].main.humidity;
                humid.textContent = "Humidity: " + humidFive + "%";

                var icon = document.createElement("img");
                icon.setAttribute("src", "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png")
                
                card.append(date, icon, temp, humid)
                fiveDay.appendChild(card);

            }
        })

    fetch(currentApi)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }
            console.log(response);
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            console.log("Current data")
            currentData = data;
            displayCurrent(currentData);
        })
}



function displayCurrent(currentData){

    console.log('This is CURRENT from current function');
    console.log(currentData);
    console.log(currentData.main.temp);

    var Lat = currentData.coord.lat;
    var Lon = currentData.coord.lon;
    getUV(Lat, Lon);

    var displayCity = document.createElement('h2');
    cityEl.append(displayCity);

    var currIcon = document.createElement("img");
    currIcon.setAttribute("src", "http://openweathermap.org/img/w/" + currentData.weather[0].icon + ".png")

    var currDate = new Date(moment().format()).toLocaleDateString();

    displayCity.append(document.createTextNode(currentData.name + "   "));
    displayCity.append(document.createTextNode(" (" + currDate + ") "));
    displayCity.append(currIcon);

    tempEl.append(document.createTextNode("Temperature: " + currentData.main.temp + " ℉"));

    humidityEl.append(document.createTextNode("Humidity: " + currentData.main.humidity + " %"));

    windEl.append(document.createTextNode("Wind Speed: " + currentData.wind.speed + " MPH"));

    uvEL.append(document.createTextNode("UV Index:  "));

}

function getUV(latitude, longitude) {
    var uvAPI = "http://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=41f0b59a1e00c5b966c2d7bde52a04f5";

    fetch(uvAPI)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }
            console.log(response);
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            console.log("THIS IS UV DATA")
            uvData = data.value;
            uvStyle(uvData);
            
        })
}

function uvStyle(uvData){
    uvVal.append(document.createTextNode(uvData));

    if (uvData >= 3 && uvData < 6){
        uvVal.style.backgroundColor = "yellow";
    }
    else if (uvData >= 6 && uvData < 8){
        uvVal.style.backgroundColor = "orange";
    }
    else if(uvData >= 8 && uvData < 11){
        uvVal.style.backgroundColor = "red";
    }
    else {
        uvVal.style.backgroundColor = "violet";
    }
}

// Function to display search history
function displayHistory(city){

    var cityName = document.createElement('li');
    cityName.textContent = city;
    console.log(cityName,history)

    cityName.onclick = function (){
        console.log("i was clicked", this.textContent)
        getApi(this.textContent)
    }
    
    searchHistoryEl.appendChild(cityName);

}

// Event listener for when user clicks search button after inputting a city name
searchBtn.addEventListener('click', handleSearchFormSubmit);


var historyArr = JSON.parse(localStorage.getItem('history')) || [];

if(historyArr.length){
    for (let i = 0; i < historyArr.length; i++) {
        console.log(historyArr[i])
       displayHistory(historyArr[i])
        
    }
}

// Event Listener for clearing city name search history
clearBtn.addEventListener('click', function clearHistory() {
    searchHistoryEl.textContent = "";
    localStorage.clear();
    historyArr = [];
});