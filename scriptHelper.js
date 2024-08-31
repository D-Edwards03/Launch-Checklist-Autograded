// Write your helper functions here!

require('cross-fetch/polyfill');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    // Here is the HTML formatting for our mission target div.
    let missionTarget = document.getElementById("missionTarget");
    missionTarget.innerHTML = `
                 <h2>Mission Destination</h2>
                 <ol>
                     <li>Name: ${name}</li>
                     <li>Diameter: ${diameter}</li>
                     <li>Star: ${star}</li>
                     <li>Distance from Earth: ${distance}</li>
                     <li>Number of Moons: ${moons}</li>
                 </ol>
                 <img src="${imageUrl}">`;
 }
 
 //checks the input and returns a specific string based on the inputs value
 function validateInput(testInput) {
    if (testInput === "") {
        return "Empty";
    } else if (isNaN(testInput)) {
        return "Not a Number";
    } else {
        return "Is a Number";
    }
 }
 
 function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");
    let launchStatus = document.getElementById("launchStatus");

    if (validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || 
        validateInput(fuelLevel) === "Empty" || validateInput(cargoLevel) === "Empty") {
            alert("All fields are required!");
        } else if (validateInput(fuelLevel) === "Not a Number" || validateInput(cargoLevel) === "Not a Number") {
            alert("Fuel level and cargo mass must be numbers!");
        } else if (validateInput(pilot) === "Is a Number" || validateInput(copilot) === "Is a Number") {
            alert("Please enter a name!");
        } else {pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`; 
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;}

    let readyForLaunch = true;

    if (fuelLevel < 10000) {
        fuelStatus.innerHTML = "Fuel level too low for launch";
        readyForLaunch = false;
    } else {
        fuelStatus.innerHTML = "Fuel level high enough for launch";
    }

    if (cargoLevel > 10000) {
        cargoStatus.innerHTML = "Cargo mass too heavy for launch";
        readyForLaunch = false;
    } else {
        cargoStatus.innerHTML = "Cargo mass low enough for launch";
    }

    if (!readyForLaunch) {
        document.getElementById("faultyItems").style.visibility = "visible";
        list.style.visibility = "visible";
        launchStatus.innerHTML = "Shuttle Not Ready for Launch";
        launchStatus.style.color = "red";
    } else {
        document.getElementById("faultyItems").style.visibility = "hidden";
        list.style.visibility = "visible";
        launchStatus.innerHTML = "Shuttle is Ready for Launch";
        launchStatus.style.color = "green";
    }
 }
 
 async function myFetch() {
     let planetsReturned;
 
     planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        return response.json();
         });
 
     return planetsReturned;
 }
 
 function pickPlanet(planets) {
    let randomPlanet = Math.floor(Math.random() * planets.length);
    let currentPlanet = planets[randomPlanet]
    return currentPlanet;
 }
 
 module.exports.addDestinationInfo = addDestinationInfo;
 module.exports.validateInput = validateInput;
 module.exports.formSubmission = formSubmission;
 module.exports.pickPlanet = pickPlanet; 
 module.exports.myFetch = myFetch;