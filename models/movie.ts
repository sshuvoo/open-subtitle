import { MovieData, Torrent } from '@/types/movie'
import { Schema, model, models } from 'mongoose'

const torrentSchema = new Schema<Torrent>({
   url: String,
   hash: String,
   quality: String,
   type: String,
   is_repack: String,
   video_codec: String,
   bit_depth: String,
   audio_channels: String,
   seeds: Number,
   peers: Number,
   size: String,
   size_bytes: Number,
   date_uploaded: String,
   date_uploaded_unix: Number,
})

const schema = new Schema<MovieData>({
   id: {
      type: Number,
      required: true,
   },
   url: String,
   imdb_code: {
      type: String,
      required: true,
   },
   title: String,
   title_english: String,
   title_long: String,
   slug: String,
   year: Number,
   rating: Number,
   runtime: Number,
   genres: [String],
   like_count: Number,
   description_intro: String,
   description_full: String,
   yt_trailer_code: String,
   language: String,
   mpa_rating: String,
   background_image: String,
   background_image_original: String,
   small_cover_image: String,
   medium_cover_image: String,
   large_cover_image: String,
   torrents: [torrentSchema],
   date_uploaded: String,
   date_uploaded_unix: Number,
})

export const Movie = models.Movie || model<MovieData>('Movie', schema)
