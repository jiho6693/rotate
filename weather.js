const apiKey = "2fcd83828c7a6dd5b3be29bc0b6fdd9c"
let lat = "41.825226"; 
let lon = "-71.418884";

const url = 'https://api.openweathermap.org/data/2.5/weather?lat='+ lat + '&lon=' + lon +'&units=imperial&appid='+ apiKey +'';

fetch(url)
  .then(response => response.json())
  .then((data) => { console.log(data)
    const weather = data.weather[0].main;
    console.log(weather)
    if(weather === "Snow"|| weather === "Rain" ){
        console.log("snow")
        time();
    } else {
        console.log("not bad")
        time();
    }

  })

function time(){
  let today = new Date();
var hours = ('0' + today.getHours()).slice(-2); 
var min = today.getMinutes();

console.log(today)
console.log(hours)
console.log(min)
};

