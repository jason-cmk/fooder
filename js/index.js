// function getLocation() {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(savePosition);
//     } else {
//         alert("Geolocation is not supported by this browser.");
//     }
// }
// getLocation();
function savePosition(position  ) {
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
// KEY dc6f27f7a384369287a372dd32685080
function searchCallback(data) {
  console.log(data);
};

function search(searchCallback) {
    var baseUrl = "http://food2fork.com/api/get?key=dc6f27f7a384369287a372dd32685080&q=shredded%20chicken&callback=my_callback"
    $.ajax({
        crossDomain: true,
        // url: baseUrl,
        url: "http://jsonplaceholder.typicode.com/posts/1",
        method: "POST",
        contentType: "application/json",
        dataType: "jsonp",
        jsonpCallback: "my_callback"
    })
        .done(function (data) {
            alert('success');
            if (data.length != 0) { 
                console.log(results);
            } else {
              console.log('no data');
            }
        })
        .fail(function (error) {
            console.log(error.getAllResponseHeaders());
    });
};
function my_callback(data) {
    console.log(data);
}