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
    var baseUrl = "http://food2fork.com/api/search?key=dc6f27f7a384369287a372dd32685080&q=shredded%20chicken"
    var search = $("#inputSearch").val();
    var sortBy = $("#sortBy").val();
    var category = $("#categories").val();
    $.ajax({
        url: baseUrl,
        method: "POST",
        headers: {
          'content-type': "application/json"
        },
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
            alert('fail');
            console.log(error.getAllResponseHeaders());
    });
};
