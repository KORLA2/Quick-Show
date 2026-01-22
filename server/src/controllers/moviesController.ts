const url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNDQyNDVlMTAyZTc4YTFkNTg3OGJlMjBiODNiMzI4NiIsIm5iZiI6MTc2ODk5OTMxNi44MjksInN1YiI6IjY5NzBjOTk0ZTEyYTMzMjQzNDhiMDRhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZQ8bx3sMFh7KFYUNsikz2vA7_O4jNr_bGQs5qdduuHY'
  }
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error(err));