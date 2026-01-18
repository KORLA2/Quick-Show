import type { MovieType } from "./MovieType"

export type DashBoardType={
    totalBookings:number,
    totalRevenue:number,
    totalUser:number,
    activeShows: ShowType[] 
}

 export type ShowType={
    _id:string,
    movie:MovieType,
    showDateTime:string,
    showPrice:number,
    occupiedSeats:{[key:string]:string},

}