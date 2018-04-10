// JavaScript 6th Edition
// Chapter 8
// Individual Case Project
// Author: Madeline Jones
// Date: 03/18/2018
// Filename: script.js

"use strict";

var newSurveyArray = []; // creates an unpopulated array to store survey results
var newSurveySubmission; // creates a variable to store the converted string
var waitForUser; // creates a variable to later store a timeout timer in

function createSurvey(event) {
	if (event === undefined) {
    event = window.event;
  } // for ie

  var surveyElement = event.target || event.srcElement;
  var surveyName = surveyElement.value;
  var fields = document.querySelectorAll("input"); // finds all values for all input types

  if (surveyElement.checked) {
    newSurveyArray.push(surveyName); // inserts the value of the checked box into the array
  } else {
    	for (var i = 0; i < fields.length; i++) {
        if (newSurveyArray[i] === surveyName) {
						newSurveyArray.splice(i, 1); // removes the value of the unchecked box from the array
				}
			}
	}
}

function validateName() {
	var nameInput = document.getElementById("name");
	var error = document.getElementById("nameError");

	try {
     if (nameInput.value.search(/^[a-zA-Z]+( [a-zA-Z]+)*$/)) {
       throw "Name should consist of letters only.";
     }
      nameInput.style.background = ""; // removes red background
      error.style.display = "none"; // removes error message
	 }
	 catch(msg) {
      // display error message
      error.style.display = "block";
      error.innerHTML = msg;
      // change input style
      nameInput.style.background = "rgb(255,233,233)";
   }
}

function validateMail() {
	var mailInput = document.getElementById("email");
	// var error = document.getElementById("mailError");

	try {
     if (mailInput.value.search(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)) {
       throw "E-mail is not in a valid format.";
     }
      // mailInput.style.background = ""; // removes red background
      // error.style.display = "none"; // removes error message
			$("#mailError").hide();
			$("#email").css("background-color", "");
	 }
	 catch(msg) {
      // display error message
      // error.style.display = "block";
      // error.innerHTML = msg;
			$("#mailError").css("display", "block");
			$("#mailError").html(msg);
      // change input style
      mailInput.style.background = "rgb(255,233,233)";
   }
}

function convertToString() {
  newSurveySubmission = newSurveyArray.toString();
} // converts the array into a string

function geoTest() {
  waitForUser = setTimeout(fail, 10000);
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(createMap, fail,{timeout:10000});
  } else {
    fail();
  }
}

function createMap(position) {
  clearTimeout(waitForUser);

  if (position.coords) {
    var Lat = position.coords.latitude;
    var Lng = position.coords.longitude;
		var Alt = position.coords.altitude;

		document.getElementById("latitude").innerHTML = "<strong>Latitude</strong>: " + Lat;
		document.getElementById("longitude").innerHTML = "<strong>Longitude</strong>: " + Lng;
	  document.getElementById("altitude").innerHTML = "<strong>Altitude</strong>: " + Alt;
  }

  var mapOptions = {
    center: new google.maps.LatLng(Lat, Lng),
    zoom: 10
  };
  var map = new google.maps.Map(document.getElementById("map"), mapOptions);
}

function createEventListeners() {
	var nameInput = document.getElementById("name");
	var mailInput = document.getElementById("email");
	if (nameInput.addEventListener) {
		nameInput.addEventListener("change", validateName, false);
		mailInput.addEventListener("change", validateMail, false);
	} else if (nameInput.attachEvent) {
		nameInput.attachEvent("onchange", validateName);
		mailInput.attachEvent("onchange", validateMail);
	}

  var menu = document.getElementsByName("menu");
  if (menu[0].addEventListener) {
    for (var i = 0; i < menu.length; i++) {
      menu[i].addEventListener("change", createSurvey, false);
    }
  } else if (menu[0].attachEvent) {
    for (var i = 0; i < menu.length; i++) {
      menu[i].attachEvent("onchange", createSurvey);
    } // runs the createSurvey function when a checkbox is checked or unchecked
  }

  var button = document.getElementById("submitBtn");
   if (button.addEventListener) {
	   button.addEventListener("click", convertToString, false);
   } else if (button.attachEvent) {
	   button.attachEvent("onclick", convertToString);
   } // runs the convertToString function when the submit button is clicked
}

function fail() {
  document.getElementById("map").innerHTML = "Unable to access your location.";
} // tells the user that the location check has failed

if (window.addEventListener) {
   window.addEventListener("load", createEventListeners, false);
} else if (window.attachEvent) {
  window.attachEvent("onload", createEventListeners);
} // loads all event listeners when page is loaded
