var toDayName = document.getElementById('now');
var todayDate = document.getElementById("Now-Date");
var countryLocation = document.getElementById("location");
var todayDegree = document.getElementById("num");
var Icon = document.getElementById("Icon");
var desc = document.getElementById("desc");
var rainPercent = document.getElementById("humedityt");
var distance = document.getElementById("distance");
var compass = document.getElementById("compass");
var searchBar = document.getElementById("search-bar");







var list = []
var City = "alex"
let apiRsponse,
    myHTTP


months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Spet', 'Oct', 'Nov', 'Dec'],
    DaysOfTheWeek = ["Sund", "Mond", "Tues", "Wed", "Thur", "Fri", "Sat",];



searchBar.addEventListener("keyup", function () {
    City = searchBar.value;
    console.log(City);
    getWeatherApi(City);
})

async function getWeatherApi(City = 'alex') {
    myHTTP = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=d5f4dd53775645ae8301307002322033&q=${City}&days=30`);
    // http://api.weatherapi.com/v1/search.json?key=<YOUR_API_KEY>&q=lond
    // http://api.weatherapi.com/v1/forecast.json?key=<YOUR_API_KEY>&q=${City}&days=7
    apiRsponse = await myHTTP.json()
    list = apiRsponse
    console.log(apiRsponse);
    displaynow();
    displayNextDay();
}

getWeatherApi();

function displaynow() {
    var date = new Date();
    toDayName.innerHTML = DaysOfTheWeek[date.getDay()];
    todayDate.innerHTML = `${date.getDate()} - ${months[date.getMonth()]}`
    countryLocation.innerHTML = apiRsponse.location.name
    // console.log(apiRsponse.location.name);
    todayDegree.innerHTML = apiRsponse.current.temp_c;
    Icon.setAttribute("src", `https:${apiRsponse.current.condition.icon}`);
    desc.innerHTML = apiRsponse.current.condition.text;
    distance.innerHTML = apiRsponse.current.wind_kph;
    compass.innerHTML = apiRsponse.current.wind_dir;
    rainPercent.innerHTML = apiRsponse.current.wind_degree;
}

console.log(DaysOfTheWeek[new Date().getDay()])


var next = document.getElementsByClassName("now");
var nextDayIcon = document.getElementsByClassName("NextIcon")
var maxDegree = document.getElementsByClassName("max-degree")
var minDegree = document.getElementsByClassName("min-degree")
var nextDayDescription = document.getElementsByClassName("nextDay-desc")

function displayNextDay() {
    for (let i = 0; i < next.length; i++) {
        next[i].innerHTML = DaysOfTheWeek[new Date(apiRsponse.forecast.forecastday[i + 1].date).getDay()];
       
        nextDayIcon[i].setAttribute('src', `https:${apiRsponse.forecast.forecastday[i + 1].day.condition.icon}`)
        maxDegree[i].innerHTML = apiRsponse.forecast.forecastday[i + 1].day.maxtemp_c;
        minDegree[i].innerHTML = apiRsponse.forecast.forecastday[i + 1].day.mintemp_c;
        nextDayDescription[i].innerHTML = apiRsponse.forecast.forecastday[i + 1].day.condition.text;
    }
}



