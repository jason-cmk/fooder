// function getLocation() {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(savePosition);
//     } else {
//         alert("Geolocation is not supported by this browser.");
//     }
// }
// getLocation();
function savePosition(position) {
  var lat = position.coords.latitude;
  var long = position.coords.longitude; 
}

$.getJSON( "./assets/zomato.json", function(data) {
  var categories = data['categories'];
  $.each(categories, function(key, value) {
    var id = value['categories']['id'];
    var name = value['categories']['name'];
    var option = $("<option value=\"" + id +"\">" + name + "</option>")
    $("#categories").append(option);
  })
});

// Zomato API
// KEY 281e20b69128a60717aa2fb9202470c2
function search() {
    var baseUrl = "https://developers.zomato.com/api/v2.1/search?";
    var search = $("#inputSearch").val();
    var sortBy = $("#sortBy").val();
    var category = $("#categories").val();
    $.ajax({
      url: baseUrl,
      beforeSend: function (xhrObj) {
            // Request headers
            xhrObj.setRequestHeader("user-key", "281e20b69128a60717aa2fb9202470c2");
            xhrObj.setRequestHeader("Access-Control-Allow-Origin", "http://fooder-search.azurewebsites.net/")
        },
        type: "POST",
    })
        .done(function (data) {
            if (data.length != 0) { // if a face is detected
                // Get the emotion scores
                console.log(results);
            } else {
                results.innerHTML = "Hmm, we can't detect a human face in that photo. Try another?";
            }
        })
        .fail(function (error) {
            pageheader.innerHTML = "Sorry, something went wrong. :( Try again in a bit?";
            console.log(error.getAllResponseHeaders());
    });
};
