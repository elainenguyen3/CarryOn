const say = require('say');
const weather = require('weather-js');
const yelp = require('yelp-fusion');
const client = yelp.client("F2uA90DOQo9pFgi9iP0O-tITpNKsoR3lsIinpRbva5QrbtTj-UGlDQ1yUnCnxjavdhHJ0ZsXKXolCBCdeie4hMMqyy9gMUIFhSXDER_Y_IoP7EybcD9MdHK3hsZDXHYx");

// Core data.
var user = "Elaine Nguyen";
var title = "Miss";
var location = "Shanghai";

// Data to be populated.
var temp;
var rest;

// Helper function for saying a string out loud.
function speak(message) {
  say.stop();
  say.speak(message);
}

// This is a series of API calls that researches the current location.
function lookup() {
  weather.find({search: location, degreeType: 'F'}, function(err, result) {
    if(err) {
      console.log(err);
    }
    temp = result[0]["current"]["temperature"];
    client.search({term:'food', location: location}).then(response => {
      rest = response.jsonBody.businesses[0].name;
      speak("Oh, you are in " + location + "? One of my favorite places to eat here, if I could eat haha, is, " + rest + "Wow, look it is currently " + temp + " degrees Fahrenheit in " + location);
    }).catch(e => {
      console.log(e);
    });
  });
}

// This function self-identifies the bag and its user.
function identify() {
	speak("I am a smart suitcase designed by Bits Please. I am currently under the ownership of " + title + " " + user);
}

// Tester function.
function test() {
  client.search({term: 'attractions', location: location}).then(response => {
    console.log(response.jsonBody.businesses[0].name);
    console.log(response.jsonBody.businesses[1].name);
    console.log(response.jsonBody.businesses[2].name);
  }).catch(e => {
    console.log(e);
  });
}

test();