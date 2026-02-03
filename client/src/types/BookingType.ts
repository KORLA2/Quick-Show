import type { MovieType } from "./MovieType"

export type BookingType={
   id: string,
   user:{name:string},
   show:{
      movie:{
         title:string
      }
      showDateTime:string
   },
   movie:MovieType,
   amount:number,
   ispaid:boolean,
   showdatetime:string,
   booked_date:string,
   seats:string[]
   theater_area:string,
   theater_name:string
   bookedSeats:string[],
   expires_at:Date,
}
