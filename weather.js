// find a solution for "Shuzenji" error

var jsonURL = "https://fcc-weather-api.glitch.me/api/current?";           
var icons = new Skycons({"color": "black"}); 


if (navigator.geolocation) {
navigator.geolocation.getCurrentPosition(function(position) {
        fetch(jsonURL + "lat=" + position.coords.latitude + "&lon=" + position.coords.longitude)    
        .then(function (response) { 
            response.json()

        .then(function manipulateJSON(json) {
            document.querySelector("#location").innerHTML = 
            "You are in " + `<strong>${json.name}</strong>,`
            var tempCelsius = Math.round(`${json.main.temp}`)
            var tempFahrenheit = Math.round(`${json.main.temp}` * 1.8 + 32)  
            document.querySelector("#temperature").innerHTML = 
            "the current temperature is " + tempCelsius;
            
            // change temp unit (refactor this code if possible)
            document.querySelector("#temp-unit")
            .onclick = function() {
                var tempUnit = document.querySelector("#temp-unit");                                 
                if (tempUnit.innerHTML === "°C") {
                    tempUnit.innerHTML = "°F";
                    document.querySelector("#temperature").innerHTML = 
                    "the current temperature is " + tempFahrenheit;                                       
                } else {
                    tempUnit.innerHTML = "°C";
                    document.querySelector("#temperature").innerHTML = 
                    "the current temperature is " + tempCelsius; 
                }
            };   
            
                //pass in the weather icons
                if (`${json.weather[0].main}` === "Rain") {
                    icons.add(document.getElementById("icon"), Skycons.RAIN);
                    icons.play();
                } else if (`${json.clouds.all}` > 30) {
                    icons.add(document.getElementById("icon"), Skycons.PARTLY_CLOUDY_DAY);
                    icons.play();
                }  else {
                    icons.add(document.getElementById("icon"), Skycons.CLEAR_DAY);
                    icons.play();
                }
        }).catch(function(error) {
            console.log(error)            
            });              
        });   
    }); 
}
