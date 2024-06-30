import { Cast, MovieData } from '@/types/movie'
import { Schema, model, models } from 'mongoose'

const castSchema = new Schema<Cast>({
   imdb_code: Number,
   name: String,
   character_name: String,
   url_small_image: String,
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
   date_uploaded: String,
   date_uploaded_unix: Number,
   cast: [castSchema],
})

export const Movie = models.Movie || model<MovieData>('Movie', schema)
