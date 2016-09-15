function search(term) {
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    term = term.replace(",", " ");
    url += '?' + $.param({
        'api-key': "5ad7731fb2cc49908c4653e3770b6bc3",
        'q': term
    });
    $.ajax({
        url: url,
        method: 'GET',
    }).done(function (result) {
        var articles = result['response']['docs'];
        $("#articles").append($("<h2>Here are some articles..</h2>")).css("display", "block");
        if (articles.length > 0) {
            $.each(articles, function (index, value) {
                var article = $("<div class=\"row\"><a target=\"_blank\" href=" + value.web_url + " >" + value.snippet + "</a></div><hr>");
                $("#articles").append(article);
            });
        }
        else {
            $("#articles").append($("<div>We couldn't find any articles for this one :(</div>"));
        }
    }).fail(function (err) {
        throw err;
    });
}
;
$.ajax({
    url: "http://nflarrest.com/api/v1/crime",
    method: 'GET',
}).done(function (data) {
    $.each(data, function (index, value) {
        var name = value['Category'];
        var arrestCount = value['arrest_count'];
        var option = $("<option value=\"" + name + "\">" + name + "</option>");
        $("#categories").append(option);
    });
});
function nfl() {
    var crime = $("#categories").val();
    $.ajax({
        url: "http://nflarrest.com/api/v1/crime/topTeams/" + encodeURIComponent(crime.trim()),
        method: 'GET',
    }).done(function (data) {
        var value = data[0];
        var team = value['Team'];
        var team_name = value['Team_name'];
        var team_city = value['Team_city'];
        var arrestCount = value['arrest_count'];
        var element = $("<div class=\"text-center answer\"> and the winner is... <div class=\"big-text\" >" + team_city + " " + team_name + "</div></div>");
        $("#articles")[0].innerHTML = "";
        $("#results")[0].innerHTML = "";
        $("#results").append(element);
        search(team_name + " " + team_city + " " + crime);
    });
}
