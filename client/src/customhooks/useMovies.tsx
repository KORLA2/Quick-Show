import { useEffect } from "react"

let useMovies=()=>{

useEffect(()=>{
fetchAllMovies()
})

}
let fetchAllMovies=async()=>{

await fetch('/api/')

}