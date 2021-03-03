var searchBtn = document.getElementById('searchbtn');
var clearBtn = document.getElementById('clear-history');
var searchHistoryEl = document.getElementById('search-history');
var cityEl = document.getElementById('city');
var tempEl = document.getElementById('temp');
var humidityEl = document.getElementById('humidity');
var windEl = document.getElementById('wind');
var currentIcon = document.getElementById('current-icon');
var fiveDay = document.getElementById('fiveDay');
var dataFiveDay;
var currentData;

// Function to handle saving user input value for the city name and saving it to local storage
function handleSearchFormSubmit(event) {
    event.preventDefault();
  
    var searchInputVal = document.querySelector('#searchinput').value;
    console.log(historyArr)
    if(historyArr.indexOf(searchInputVal) === -1){
        historyArr.push(searchInputVal);
        localStorage.setItem('history', JSON.stringify(historyArr))
        displayHistory(searchInputVal)
    }
    if (!searchInputVal) {
      console.error('You need a search input value!');
      return;
    }

    console.log(searchInputVal);

   //localStorage.setItem('city', searchInputVal);
   
    getApi(searchInputVal);
}

//"https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=41f0b59a1e00c5b966c2d7bde52a04f5"
//Current weather:
//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=41f0b59a1e00c5b966c2d7bde52a04f5"

// Function to get API based on user's city name input
// Need to create another fetch call for the current weather
function getApi(city) {
    
    var weatherApi = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=41f0b59a1e00c5b966c2d7bde52a04f5&units=imperial";
    var currentApi = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=41f0b59a1e00c5b966c2d7bde52a04f5&units=imperial";
    console.log(weatherApi);
//clear 5-day and current weather div's
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
            //console.log(data);
            // console.log("5-day data")
            // console.log(data.list[0].main.humidity);
            // console.log(data.list[0].main.temp);
            // console.log(data.list[4].weather[0].icon);
            dataFiveDay = data;

            for (i = 4; i < dataFiveDay.list.length; i+=8) {
                var card = document.createElement("div");
                card.classList.add("col", "bg-primary", "five")

                var date = document.createElement("h2")
                var dateFive = data.list[i].dt_txt;
                date.textContent = new Date(dateFive).toLocaleDateString();
                
                var temp = document.createElement("p")
                var tempFive = data.list[i].main.temp;
                temp.textContent = "Temperature: " + tempFive;

                var humid = document.createElement("p")
                var humidFive = data.list[i].main.humidity;
                humid.textContent = "Humid: " + humidFive

                var icon = document.createElement("img");
                icon.setAttribute("src", "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png")
                //var iconFive = data.list[i].weather[0].icon;
                // console.log(dateFive, tempFive, humidFive);
                card.append(date, temp, humid, icon)
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

// Function to display 5-day forecast
//function displayFiveDay(dataFiveDay){
    // Need to loop through object for each day given the parameters I want (humidity, temp, etc)
    // data.list[4,12,20,28,36]
    // for (i = 4; i < 36; i+8) {
    //     var dateFive = dataFiveDay.list[i].dt_txt;
    //     var tempFive = dataFiveDay.list[i].main.temp;
    //     var humidFive = dataFiveDay.list[i].main.humidity;
    //     var iconFive = data.list[i].weather[0].icon;

    //     console.log(dateFive);

    // }

//}

function displayCurrent(currentData){
//data.name, data.main.temp, data.main.humidity, data.wind.speed, data.weather[0].main or icon);
    console.log('This is CURRENT from current function');
    console.log(currentData);
    console.log(currentData.main.temp);

    var displayCity = document.createElement('h2');
    cityEl.append(displayCity);
    displayCity.append(document.createTextNode(currentData.name + " " + currentData.weather[0].icon));

    tempEl.append(document.createTextNode("Temperature: " + currentData.main.temp + " ℉"));





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

// Event Listener for clearing city name search history
clearBtn.addEventListener('click', function clearHistory() {
    searchHistoryEl.innerHTML = "";
    localStorage.clear();
});


// Event listener for when user clicks search button after inputting a city name
searchBtn.addEventListener('click', handleSearchFormSubmit);


var historyArr = JSON.parse(localStorage.getItem('history')) || [];


if(historyArr.length){

    for (let i = 0; i < historyArr.length; i++) {
        console.log(historyArr[i])
       displayHistory(historyArr[i])
        
    }
}
