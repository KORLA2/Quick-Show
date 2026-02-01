import type { MovieType } from "./MovieType"

export type BookingType={
   id: string,
   movie:MovieType,
   amount:number,
   ispaid:boolean,
   showdatetime:string,
   booked_date:string,
   seats:string[]
   theater_area:string,
   theater_name:string
}
