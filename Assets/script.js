var searchBtn = document.getElementById('searchbtn');


function handleSearchFormSubmit(event) {
    event.preventDefault();
  
    var searchInputVal = document.querySelector('#searchinput').value;
  
    if (!searchInputVal) {
      console.error('You need a search input value!');
      return;
    }

  
    localStorage.setItem('city')
    getApi;
}


function getApi() {


}









searchBtn.addEventListener('click', handleSearchFormSubmit);