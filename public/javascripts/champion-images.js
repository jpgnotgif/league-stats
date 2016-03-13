$(document).ready(function() {
  var groupedChampionIdElements = _.groupBy($("img.champion-photo"), function(e) {
    return $(e).data("champion-id");
  });

  _.each(groupedChampionIdElements, function(elements, championId) {
    var url = "/champion/" + championId.toString() + "/image";

    $.get(url, function(championImageUrl) {
      _.each(elements, function(e) {
        $(e).attr('src', championImageUrl);
      });
    });
  });
});
