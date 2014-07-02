class ConcertsController < ApplicationController
  respond_to :html, :js

  def show
    @concert = Concert.find(params[:id])
    @venue = Venue.find(@concert.venue_id)
    @concert_photo = @concert.concert_photos.new
    # [0..-2] to avoid displaying @concert_photo above in the image gallery
    @concert_photos = @concert.concert_photos[0..-2]
    @concert_songs = @concert.concert_songs.sort_by(&:order)
    @song_names = @concert_songs.map { |c_s| c_s.song.title }
  end

  def flag_video
    @video = Video.find(params[:video_id])

    @video.update(correct: false)

    render json: { response: "Video flagged" }
  end

  def unflag_video
    @video = Video.find(params[:video_id])

    @video.update(correct: true)

    render json: { response: "Video unflagged" }
  end
end
