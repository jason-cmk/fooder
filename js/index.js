function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(savePosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}
getLocation();
function savePosition(position) {
  var lat = position.coords.latitude;
  var long = position.coords.longitude; 
}

$.getJSON( "./assets/categories.json", function(data) {
  $.each(data, function(key, value) {
    var option = $("<option value=\"" + value.alias +"\">" + value.title + "</option>")
    $("#categories").append(option);
  })
});

// Yelp call
var Yelp = require('yelp');

var yelp = new Yelp({
  consumer_key: 'Kfm6XvRhNhNOuBolKBt3cw',
  consumer_secret: 'u31V1Zz_qRwdQurDr2ibKJdPGXE',
  token: 'B2xmnDLtakXtqfeSVwrO7HOwt0l7F256',
  token_secret: '4Co9cHLVLIRiAr7AxkjQFzQJeU4',
});

// See http://www.yelp.com/developers/documentation/v2/search_api
yelp.search({ term: 'food', location: 'Montreal' })
.then(function (data) {
  console.log(data);
})
.catch(function (err) {
  console.error(err);
});

// See http://www.yelp.com/developers/documentation/v2/business
yelp.business('yelp-san-francisco')
  .then(console.log)
  .catch(console.error);

yelp.phoneSearch({ phone: '+15555555555' })
  .then(console.log)
  .catch(console.error);

// A callback based API is also available:
yelp.business('yelp-san-francisco', function(err, data) {
  if (err) return console.log(error);
  console.log(data);
});