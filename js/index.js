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

//  yelp 
// Consumer Key Kfm6XvRhNhNOuBolKBt3cw
// Consumer Secret	u31V1Zz_qRwdQurDr2ibKJdPGXE
// Token	B2xmnDLtakXtqfeSVwrO7HOwt0l7F256
// Token Secret	4Co9cHLVLIRiAr7AxkjQFzQJeU4

function search() {
    // var baseUrl = "https://api.yelp.com/v2/search/?location=San Francisco, CA"
    // $.ajax({
    //     crossDomain: true,
    //     url: baseUrl,
    //     // url: "http://jsonplaceholder.typicode.com/posts/1",
    //     method: "POST",
    //     contentType: "application/json",
    //     dataType: "jsonp",
    //     jsonpCallback: "my_callback"
    // })
    //     .done(function (data) {
    //         alert('success');
    //         if (data.length != 0) { 
    //             console.log(results);
    //         } else {
    //           console.log('no data');
    //         }
    //     })
    //     .fail(function (error) {
    //         alert('fail');
    //         console.log(error.getAllResponseHeaders());
    // });
    var oauth = OAuth({
    consumer: {
        key: 'Kfm6XvRhNhNOuBolKBt3cw',
        secret: 'u31V1Zz_qRwdQurDr2ibKJdPGXE'
    },
    signature_method: 'HMAC-SHA1',
    hash_function: function(base_string, key) {
        return CryptoJS.HmacSHA1(base_string, key).toString(CryptoJS.enc.Base64);
    }
    });
    var request_data = {
        url: 'https://api.yelp.com/v2/search?term=food&location=San+Francisco',
        method: 'GET',
    };
    var token = {
        key: 'B2xmnDLtakXtqfeSVwrO7HOwt0l7F256',
        secret: '4Co9cHLVLIRiAr7AxkjQFzQJeU4'
    };
    $.ajax({
        url: request_data.url,
        type: request_data.method,
        headers: oauth.toHeader(oauth.authorize(request_data, token)),
        dataType : 'jsonp',
        jsonpCallback : 'cb',
        async : 'false',
        cache: true,
    }).done(function(data) {
        //process your data here
        console.log(data);
    }).fail(function(error) {
        console.log(error);
    })
};