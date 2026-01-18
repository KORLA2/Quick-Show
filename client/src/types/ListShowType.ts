import type { MovieType } from "./MovieType"

export type ListShowType={
    movie:MovieType,
    showDateTime:string,
    showPrice:number,
    occupiedSeats:{[key:string]:string}
}