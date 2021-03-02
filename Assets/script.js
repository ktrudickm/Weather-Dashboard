var searchBtn = document.getElementById('searchbtn');
var searchHistoryEl = document.getElementById('search-history');
var clearBtn = document.getElementById('clear-history');



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

// Function to get API based on user's city name input
function getApi() {
    var savedCity = localStorage.getItem('city');
    var weatherApi = "https://api.openweathermap.org/data/2.5/forecast?q=" + savedCity + "&appid=41f0b59a1e00c5b966c2d7bde52a04f5&units=imperial";
    console.log(weatherApi);

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

    cityName.classList.add("listItm");
    cityName.style.listStyle = "none";
}

// Event Listener for clearing city name search history
clearBtn.addEventListener('click', function clearHistory() {
    searchHistoryEl.innerHTML = "";
    localStorage.clear();
});


// Event listener for when user clicks search button after inputting a city name
searchBtn.addEventListener('click', handleSearchFormSubmit);


