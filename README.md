# CoffeeMapper

### Overview

CoffeeMapper is an application for locating cafes/coffee shops via current or user inputted location. It adopts the sidebar-map UI model but with an Apple-esque slant on aesthetics.

The initial view displays cafes based on your location. Please allow a couple of seconds for the browser to locate you and retrieve results. If you input an address, the Rails app communicates with Yelp to re-populate results and communicates with the front-end to re-render the results and adjust the map.

### Technologies Used

* Ruby 2.1.1
* Rails 4.1.1
* [jQuery](http://jquery.com/)
* [Yelp API](http://www.yelp.com/developers/documentation) and the [Yelp Ruby gem](https://github.com/Yelp/yelp-ruby)
* [Google Maps Javascript API](https://developers.google.com/maps/documentation/javascript/) and the [Google Geocoder API](https://developers.google.com/maps/documentation/geocoding/)

### Setup

The live app can be found on Heroku at [http://cafemapper.herokuapp.com](http://cafemapper.herokuapp.com).

If you'd like to set up the app on your local machine, follow the instructions below:

IMPORTANT: You will need to provide your own Yelp and Google API keys. Simply replace the ENV variables in the yelp.rb file located in config/initializers with your own.

```
bundle install
rake db:create
rake db:migrate
rails s
```

The app should now be running on 'localhost:3000'

### Improvements/TODO

* AngularJS or Backbone.js framework for the front end.
* Capybara/Rspec behavior and unit tests.
* Driving directions/Uber API integration.
* Users and ability to favorite cafes and add them to lists (like Foursquare).
* More coverage on geo-coding. Figure out method around geocoder rate limit or new API such as Foursquare?
* Mobile and responsiveness.

***
Written by Brett Wallace
