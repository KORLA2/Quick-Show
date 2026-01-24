import express from 'express';
import dotenv from "dotenv";
import { ConnectDB, pool } from './db/connect.js'
import { userRouter } from './routes/userRoutes.js';
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { showRouter } from './routes/showRoutes.js';
import { adminRouter } from './routes/adminRoutes.js';
import { checkSeatAvailability, checkSeatsCOntroller } from './controllers/bookingController.js';

dotenv.config();

let app=express();
app.use(cors(
  {
    origin : process.env.CLIENT_URL||'http://localhost:5173',
    credentials:true
  }
))



const PORT=process.env.PORT||3000;

app.use(express.json());
app.use(cookieParser())

app.use('/api/user',userRouter)
app.use('/api/admin',adminRouter)
app.get('/booking',checkSeatsCOntroller)

let start=async ()=>{


    try{
  
  await ConnectDB();
          app.listen(PORT,()=>{
            console.log(`Server is running on port ${PORT}`);
          })   



    }catch(err){
 console.error("Error starting the server:",err);

 process.exit(1);
    }


}


start();

export default app;