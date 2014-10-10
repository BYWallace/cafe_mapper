var markersArray = [];
var appleMapsStyle = [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#a2daf2"}]},{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"color":"#f7f1df"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"color":"#d0e3b4"}]},{"featureType":"landscape.natural.terrain","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#bde6ab"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi.medical","elementType":"geometry","stylers":[{"color":"#fbd3da"}]},{"featureType":"poi.business","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffe15f"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#efd151"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"color":"black"}]},{"featureType":"transit.station.airport","elementType":"geometry.fill","stylers":[{"color":"#cfb2db"}]}];
var googleMapsAPIKey = "AIzaSyBBC2BrtSuloODCOhMgRugWNqmBgDFWcpc";
var map;

$(document).ready(function() {
  // Initialize map on load.
  navigator.geolocation.getCurrentPosition(function(position) {
    initialize(position.coords.latitude, position.coords.longitude);
  });
});

var initialize = function(startingLat, startingLng) {
  var mapOptions = {
    center: new google.maps.LatLng(startingLat, startingLng),
    zoom: 14,

    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: appleMapsStyle,

    // Hide Google map controls
    panControl: false,
    streetViewControl: false,

    // Move the zoom controls
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_BOTTOM,
      style: google.maps.ZoomControlStyle.SMALL
    }
  };

  // Create a new Google map with the options above.
  map = new google.maps.Map($("#map-canvas")[0], mapOptions);

  bindControls();
};

// Bind event listeners for search submission

var bindControls = function() {
  // Find container for search box and bind event on submit.
  var searchContainer = $("#search-container")[0];
  google.maps.event.addDomListener(searchContainer, "submit", function(e) {
    e.preventDefault();
    search();
  });

  var searchButton = $("#map-search-submit")[0];
  google.maps.event.addDomListener(searchButton, "click", function(e) {
    e.preventDefault();
    search();
  });
};

var search = function() {
  var searchLocation = $("#map-search input").val();

  // Remove any previous results from DOM
  $("#results").fadeOut(400, function() {
    $(this).empty();
  });

  // POST ajax request to Google geocoder and parse coordinates
  $.post("https://maps.googleapis.com/maps/api/geocode/json?address=" + searchLocation.split(" ").join("+") + "&key=" + googleMapsAPIKey, function(data) {
     panToCoordinates(data);
  });

};

var panToCoordinates = function(data) {
  var geoCoordinates = data.results[0].geometry.location;
  map.panTo(geoCoordinates);

  $.post("/search", geoCoordinates, function(data) {
    parseResults(data);
  });
};

var parseResults = function(data) {
  for (var i=0; i < data.businesses.length; i++) {
    var business = data.businesses[i];

    $("#results").append("<div class='result'><img src='" + business.image_url + "'><div class='business-name'>" +
      business.name + "</div>" +
      "<div class='business-address'><div>" +
      business.location.display_address[0] +
      "</div><div>" +
      business.location.display_address[1] +
      "</div></div></div>").hide().fadeIn(400);
  }
};

// TODO use built-in Google geocode to turn address into coordinates and send to Rails app for Yelping
