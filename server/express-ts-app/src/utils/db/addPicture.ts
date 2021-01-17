import { Client, Pool } from 'pg';
import { pool, ADD_PICTURE_QUERY } from './databaseConstants'
//returns pictureID and makes a room
export default async function addPathtoDB(picURI: String, userid: number) {
  //TODO implement This
  try {
    let result = await pool.query(ADD_PICTURE_QUERY, [userid,picURI])

    return result.rows[0].id as number;
  } catch (e) {
    throw e;
    
    
  }
  

  
}