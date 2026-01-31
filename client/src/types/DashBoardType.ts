import type { MovieType } from "./MovieType"

export type DashBoardType={
    totalBookings:number,
    totalRevenue:number,
    totalUsers:number,
    activeshows: ShowType[] 
}

 export type ShowType={
    id:string,
    movie:MovieType,
    showdatetime:string,
    showprice:number,
    occupiedSeats:{[key:string]:string},

}