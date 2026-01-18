import type { MovieType } from "./MovieType"

export type BookingType={
   _id: string,
   user: {name:string},
   show:showType
   amount:number,
   bookedSeats:string[],
   isPaid:boolean

}
type showType={
    _id:string,
    movie:MovieType,
    showDateTime:string,
  showPrice:number
}