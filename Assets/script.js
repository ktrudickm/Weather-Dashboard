var searchBtn = document.getElementById('searchbtn');
var clearBtn = document.getElementById('clear-history');
var searchHistoryEl = document.getElementById('search-history');
var cityEl = document.getElementById('city');
var tempEl = document.getElementById('temp');
var humidityEl = document.getElementById('humidity');
var windEl = document.getElementById('wind');
var currentIcon = document.getElementById('current-icon');
var dataFiveDay;

// Function to handle saving user input value for the city name and saving it to local storage
function handleSearchFormSubmit(event) {
    event.preventDefault();
  
    var searchInputVal = document.querySelector('#searchinput').value;
  
    if (!searchInputVal) {
      console.error('You need a search input value!');
      return;
    }

    console.log(searchInputVal);
    localStorage.setItem('city', searchInputVal);
    displayHistory(searchInputVal);
    getApi(searchInputVal);
}

//"https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=41f0b59a1e00c5b966c2d7bde52a04f5"
//Current weather:
//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=41f0b59a1e00c5b966c2d7bde52a04f5"

// Function to get API based on user's city name input
// Need to create another fetch call for the current weather
function getApi() {
    var savedCity = localStorage.getItem('city');
    var weatherApi = "https://api.openweathermap.org/data/2.5/forecast?q=" + savedCity + "&appid=41f0b59a1e00c5b966c2d7bde52a04f5&units=imperial";
    var currentApi = "https://api.openweathermap.org/data/2.5/weather?q=" + savedCity + "&appid=41f0b59a1e00c5b966c2d7bde52a04f5&units=imperial";
    console.log(weatherApi);

    fetch(weatherApi)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }
            console.log(response);
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            console.log("5-day data")
            console.log(data.list[0].main.humidity);
            console.log(data.list[0].main.temp);
            console.log(data.list[4].weather[0].icon);
            dataFiveDay = data;

            for (i = 4; i < dataFiveDay.list.length; i+=8) {
                var dateFive = data.list[i].dt_txt;
                var tempFive = data.list[i].main.temp;
                var humidFive = data.list[i].main.humidity;
                var iconFive = data.list[i].weather[0].icon;
        
                console.log(dateFive);
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

            // displayCurrent(data.name, data.main.temp, data.main.humidity, data.wind.speed, data.weather[0].main or icon);
        })
}

// Function to display 5-day forecast
function displayFiveDay(dataFiveDay){
    // Need to loop through object for each day given the parameters I want (humidity, temp, etc)
    // data.list[4,12,20,28,36]
    // for (i = 4; i < 36; i+8) {
    //     var dateFive = dataFiveDay.list[i].dt_txt;
    //     var tempFive = dataFiveDay.list[i].main.temp;
    //     var humidFive = dataFiveDay.list[i].main.humidity;
    //     var iconFive = data.list[i].weather[0].icon;

    //     console.log(dateFive);

    // }


}

function displayCurrent(){


}


// Function to display search history
function displayHistory(){
    var history = document.createElement('ul');
    searchHistoryEl.append(history);
    var cityName = document.createElement('li');
    var cityListText = document.createTextNode(localStorage.getItem('city'));

    cityName.append(cityListText);
    history.appendChild(cityName);
    console.log(history);

    cityName.style.listStyle = "none";
}

// Event Listener for clearing city name search history
clearBtn.addEventListener('click', function clearHistory() {
    searchHistoryEl.innerHTML = "";
    localStorage.clear();
});


// Event listener for when user clicks search button after inputting a city name
searchBtn.addEventListener('click', handleSearchFormSubmit);


