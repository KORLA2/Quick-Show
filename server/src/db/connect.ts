import {Pool} from 'pg';
import dotenv from 'dotenv';
dotenv.config();

export let pool=new Pool({
 connectionString:process.env.PROD_CONNECTION_STRING
 
});


 export async function ConnectDB(){
    try{

      let res=  await pool.query('select 1');
    console.log(res);
    }
    catch(err){
      throw err;   
    }

}