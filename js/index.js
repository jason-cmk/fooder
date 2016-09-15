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

$.getJSON( "./assets/data.txt", function(data) {
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
      dataType: "jsonp",
      contentType: "application/json",
      beforeSend: function (xhrObj) {
            // Request headers
            xhrObj.setRequestHeader("user_key", "281e20b69128a60717aa2fb9202470c2");
            // xhrObj.setRequestHeader("Access-Control-Allow-Origin", "http://fooder-search.azurewebsites.net")
        },
        type: "POST",
    })
        .done(function (data) {
            if (data.length != 0) { 
                console.log(results);
            } else {
              console.log('no data')
            }
        })
        .fail(function (error) {
            console.log(error.getAllResponseHeaders());
    });
};
