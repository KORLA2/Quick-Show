export type MovieType={
  _id:string,
  id:number,
  title:string  ,
  overview:string,
  poster_path:string,
  backdrop_path:string,
  genres:{id:number,name:string}[],
  casts:Cast[],
  release_date:string,
  original_language:string,
  tagline:string,
  vote_average:number,
  vote_count:number,
  runtime:number
} ;

type Cast={
    name:string,
    profile_path:string
}