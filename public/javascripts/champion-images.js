$(document).ready(function() {



  $("img.champion-photo").each(function(i, e) {
    var $currentImage = $(e);
    var championId = $currentImage.data('champion-id');
    var url = "http://localhost:3000/summoner/champion_img?championId=" + championId.toString();
    $.get(url, function(championImageUrl) {
      $currentImage.attr('src', championImageUrl);
    });
  });
});
