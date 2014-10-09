var markersArray = [];
var inactive = false;
var appleMapsStyle = [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#a2daf2"}]},{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"color":"#f7f1df"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"color":"#d0e3b4"}]},{"featureType":"landscape.natural.terrain","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#bde6ab"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi.medical","elementType":"geometry","stylers":[{"color":"#fbd3da"}]},{"featureType":"poi.business","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffe15f"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#efd151"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"color":"black"}]},{"featureType":"transit.station.airport","elementType":"geometry.fill","stylers":[{"color":"#cfb2db"}]}];


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
  var map = new google.maps.Map($("#map-canvas")[0], mapOptions);

  bindControls(map);
};

// Bind event listeners for search submission

var bindControls = function(map) {
  // Find container for search box and bind event on submit.
  var searchContainer = $("#search-container")[0];
  google.maps.event.addDomListener(searchContainer, "submit", function(e) {
    e.preventDefault();
    search(map);
  });

  var searchButton = $("map-search-submit")[0];
  google.maps.even.addDomListener(searchButton, "click", function(e) {
    e.preventDefault();
    search(map);
  });
};

// TODO use built-in Google geocode to turn address into coordinates and send to Rails app for Yelping
