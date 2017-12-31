$(document).ready(function() {

//function to gather users local weather information based off IP address
function localWeather() {
	//request to ipinfo.io for user location data
	$.getJSON('http://ipinfo.io', function(data) {
		//array[0] is latitude and array[1] is longitude
		var coordinatesArray = data.loc.split(",");

		//set request URL for Google Reverse Geocoding with coordinates from user location(IP)
		var googleReverseGeoURL = "https://maps.googleapis.com/maps/api/geocode/json?latlng=";
			googleReverseGeoURL += coordinatesArray[0] + ",";
			googleReverseGeoURL += coordinatesArray[1];
			googleReverseGeoURL += "&key=AIzaSyCysm-1Tmzyz1dN1a8FQbXT5xfm5-3fGzY";
			googleReverseGeoURL += "&result_type=country|administrative_area_level_1|locality";

		//request to Google Reverse Geocoding API for city/state/country name
		$.getJSON(googleReverseGeoURL, function(data) {
			$('#date-time-place h2').html(data.results[0].formatted_address);
		});

		//setting request URL for OpenWeatherMap with coordinates from user location(IP)
		var openWeatherMapURL = "http://api.openweathermap.org/data/2.5/weather?lat=" + coordinatesArray[0];
		openWeatherMapURL += "&lon=" + coordinatesArray[1];
		openWeatherMapURL += "&appid=51f61b5f031e34a4e3c790f126690615&units=imperial";

		//request to OpenWeatherMap API for weather data using user location
		$.getJSON(openWeatherMapURL, weatherData);
	});

	//set date and time according to user location
	// var localDateObject = new Date();
	// $("#date").text(localDateObject.toLocaleDateString('en-US', {month: 'long', day: '2-digit', year: 'numeric'}));
	// $("#time").text(localDateObject.toLocaleTimeString('en-US', {weekday: 'long', hour: 'numeric', minute: 'numeric'}));
}

//primary function to display weather data from OpenWeatherMap API
function weatherData(data) {
	$("#temperature").html(Math.round(data.main.temp) + "&deg");
	$("#cloudiness").html('<i class="wi wi-cloudy"></i> Cloudiness: ' + data.clouds.all + " %");
	$("#wind").html('<i class="wi wi-strong-wind"></i> Windspeed: ' + data.wind.speed + " mph");
	$("#humidity").html('<i class="wi wi-humidity"></i> Humidity: ' + data.main.humidity + " %");

	//Capitalize first letter of each word in weather description
	var arr = data.weather[0].description.split(" ");
	var finalArray = [];
	for (i = 0; i < arr.length; i++) {
		var newArr = arr[i].split("");
		newArr[0] = newArr[0].toUpperCase();
		finalArray.push(newArr.join(""));
	}
	capitalizedDescription = finalArray.join(" ");
	$("#description").text(capitalizedDescription);

	//Dynamically set weather icon
	switch (data.weather[0].description) {
		case "clear sky":
			answer = $("#main-weather i").removeClass().addClass("wi wi-owm-day-800");
			break;
		case "few clouds":
		case "scattered clouds":
		case "broken clouds":
		case "overcast clouds":
			answer = $("#main-weather i").removeClass().addClass("wi wi-owm-804");
			break;
		case "shower rain":
		case "light rain":
			answer = $("#main-weather i").removeClass().addClass("wi wi-owm-313");
			break;
		case "rain":
			answer = $("#main-weather i").removeClass().addClass("wi wi-owm-302");
			break;
		case "thunderstorm":
			answer = $("#main-weather i").removeClass().addClass("wi wi-owm-230");
			break;
		case "snow":
			answer = $("#main-weather i").removeClass().addClass("wi wi-owm-600");
			break;
		case "mist":
			answer = $("#main-weather i").removeClass().addClass("wi wi-owm-741");
			break;
		case "dust":
			answer = $("#main-weather i").removeClass().addClass("wi wi-owm-731");
			break;
		default:
			answer = $("#main-weather i").removeClass().addClass("wi wi-na");
	}	


	//setting URL for Google Time Zone API request using the sunrise(unix UTC) timestamp
	var time = "https://maps.googleapis.com/maps/api/timezone/json?location=";
		time += data.coord.lat + ",";
		time += data.coord.lon;
		time += "&timestamp=" + data.sys.sunrise;
		time += "&key=AIzaSyCysm-1Tmzyz1dN1a8FQbXT5xfm5-3fGzY";
	//Google Time Zone API request to get offset times for sunrise/sunset
	$.getJSON(time, function(timeData) {
		//setting sunrise/sunset objects by gathering the time offset data and the actual timestamp  
		var sunriseObject = calcTime(timeData.dstOffset + timeData.rawOffset, data.sys.sunrise * 1000);
		var sunsetObject = calcTime(timeData.dstOffset + timeData.rawOffset, data.sys.sunset * 1000);
		//displaying sunrise/sunset times
		$("#sunrise").html('<i class="wi wi-sunrise"></i> Sunrise: ' + sunriseObject.toLocaleTimeString('en-US', {hour: "numeric", minute: "numeric", hour12: true}));
		$("#sunset").html('<i class="wi wi-sunset"></i> Sunset: ' + sunsetObject.toLocaleTimeString('en-US', {hour: "numeric", minute: "numeric", hour12: true}));
	});
}

//Function for calculating and returning a Date object that accounts for offset from UTC (this includes daylight savings time offset if applicable) and any particular timestamp
//I use the timestamp parameter to either calculate current time, or sunrise/sunset time
//If offset is 0 and timestamp is set to Date.now() then current UTC time is returned
function calcTime(offset, timestamp) {
	var d = new Date(timestamp);
	var utc = d.getTime() + (d.getTimezoneOffset() * 60000); //current location time + offset from UTC returns UTC time
	var localDateObject = new Date(utc + (1000*offset)); // UTC + offset from UTC and offset from daylight savings returns local time
	return localDateObject;
}

var fahrenheit = true;
//Convert temperature display to celsius
$("#celsius").click(function() {
	if (fahrenheit === true) {
		$("#temperature").html(Math.round((parseInt($("#temperature").text())-32) / 1.8) + "&deg");
		fahrenheit = false;	
	}
});
//Convert temperature display to fahrenheit
$("#fahrenheit").click(function() {
	if (fahrenheit === false) {
		$("#temperature").html(Math.round((parseInt($("#temperature").text()) * 1.8) + 32) + "&deg");
		fahrenheit = true;	
	}
});

	
//execute function on initial page load to show local weather and local date/time
localWeather();

//show weather for current user when clicking Current Location button
$("#location").click(function(evt) {
	evt.preventDefault();
	localWeather();
	fahrenheit = true;
});

//search for weather by city name
$("#cityButton").click(function(evt) {
	evt.preventDefault();
	var city = $("#citySearch").val();
	citySearch(city);
});

//function for search weather by city name
function citySearch(city) {
	fahrenheit = true;

	//request URL for OpenWeatherMap
	var cityURL = "http://api.openweathermap.org/data/2.5/weather?q=";
		cityURL += city;
		cityURL += "&appid=51f61b5f031e34a4e3c790f126690615&units=imperial";

	//request to OpenWeatherMap API for weather data using city query
	$.getJSON(cityURL, weatherData);

	//request URL for Google Geocoding API
	var geo = "https://maps.googleapis.com/maps/api/geocode/json?address=";
		geo += city;
		geo += "&key=AIzaSyCysm-1Tmzyz1dN1a8FQbXT5xfm5-3fGzY";
		geo += "&result_type=country|administrative_area_level_1|locality"

	//request to Google Geocoding API to display state information, this is unavailable with OpenWeatherMap API
	$.getJSON(geo, function(data) {
		$('#date-time-place h2').html(data.results[0].formatted_address);

		var lat = data.results[0].geometry.location.lat;
		var lng = data.results[0].geometry.location.lng;
		var d = new Date();
		var unixTimeStamp = d.getTime() / 1000;

		//request URL for Google Time Zone API
		var time = "https://maps.googleapis.com/maps/api/timezone/json?location=";
			time += lat + ",";
			time += lng;
			time += "&timestamp=" + unixTimeStamp;
			time += "&key=AIzaSyCysm-1Tmzyz1dN1a8FQbXT5xfm5-3fGzY";

		//request to Google Time Zone API to get correct time of queried city
		$.getJSON(time, function(data) {
			var localDateObject = calcTime(data.dstOffset + data.rawOffset, Date.now());
			$("#date").text(localDateObject.toLocaleDateString('en-US', {month: 'long', day: '2-digit', year: 'numeric'}));
			$("#time").text(localDateObject.toLocaleTimeString('en-US', {weekday: 'long', hour: 'numeric', minute: 'numeric'}));
		});
	});
}


});
