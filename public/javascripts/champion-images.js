$(document).ready(function() {
  var groupedChampionIdElements = _.groupBy($("img.champion-photo"), function(e) {
    return $(e).data("champion-id");
  });

  _.each(groupedChampionIdElements, function(elements, championId) {
    var url = "http://localhost:3000/summoner/champion_img?championId=" + championId.toString();

    $.get(url, function(championImageUrl) {
      _.each(elements, function(e) {
        $(e).attr('src', championImageUrl);
      });
    });
  });
});
