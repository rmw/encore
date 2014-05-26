var songsAndIds = {};
$(document).ready(function() {
  $('.add-song').on("submit", function(e) {
    e.preventDefault();
    var form = $(this).closest("form");

    var youtubeTitle = form.find('#yt-title').text();
    var songId = form.find('#song_id').val();
    var songTitle = form.find('select').val();

    songsAndIds[songId] = songTitle;

    var songEl = ""
    var authenticity = form.find('input[name=authenticity_token]').val();

    songEl += "<p>"
    songEl += songTitle + " - "
    songEl += youtubeTitle
    songEl += "</p>"

    $('#added_songs').append(songEl);

    $.post('/songs', { song: songTitle,
                       song_id: songId,
                       concert_id: concertId,
                       artist_id: artistId,
                       authenticity_token: authenticity})
      .done(function(data) {
        console.log(data);
        $('#flash').empty();
        $('#flash').append('<div class="alert alert-success">' + data + '</div>');
      });
  });

  $("#save_concert").on("click", function(e){
    e.preventDefault();
    var concertInfo = $(this).closest("form").serialize();
    var songList = $.param({ songs: songsAndIds });
    $.ajax({
      url: "create_concert",
      method: "post",
      data: (concertInfo + '&' + songList)
    });
  });

  $('.remove-video').on('click', function(e) {
    e.preventDefault();
    var $this = $(this);

    console.log($this.closest('.add-song'));
    $this.closest('.add-song').remove();
  })
});
