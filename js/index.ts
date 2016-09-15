declare var $:any;

function search(term : string) {
    var url : string = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
      'api-key': "5ad7731fb2cc49908c4653e3770b6bc3",
      'q': term
    });
    $.ajax({
      url: url,
      method: 'GET',
    }).done(function(result) {
        var articles : any = result['response']['docs'];
        if (articles.length > 0) {
            $("#articles").append($("<h2>Here are some articles..</h2>"));
        $.each(articles, function(index, value) {
            var article : HTMLDivElement = <HTMLDivElement> $("<div class=\"row\"><a target=\"_blank\" href=" + value.web_url + " >" + value.snippet +  "</a></div>");
            $("#articles").append(article);
        })
        }
    }).fail(function(err) {
      throw err;
    });
};

$.ajax({
    url: "http://nflarrest.com/api/v1/crime",
    method: 'GET',
    }).done(function(data){
    $.each(data, function(index, value) {
        var name : string = value['Category'];
        var arrestCount : string = value['arrest_count'];
        var option : HTMLOptionElement =  <HTMLOptionElement> $("<option value=\"" + name +"\">" + name + "</option>")
        $("#categories").append(option);
    })
});

function nfl() {
    var crime : string = $("#categories").val();
    $.ajax({
        url: "http://nflarrest.com/api/v1/crime/topTeams/" +  encodeURIComponent(crime.trim()),
        method: 'GET',
        }).done(function(data){
            var value : Object = data[0];
            var team : string = value['Team'];
            var team_name : string = value['Team_name'];
            var team_city : string = value['Team_city']
            var arrestCount : number = value['arrest_count'];
            var element : HTMLDivElement = <HTMLDivElement> $("<div class=\"text-center answer\"> and the winner is... <div class=\"big-text\" >" + team_city + " " + team_name + "</div></div>")
            $("#articles")[0].innerHTML = "";
            $("#results")[0].innerHTML = "";
            $("#results").append(element);
            search(team_name + " " + team_city + " " + crime);
    });
}