import { Client, Pool } from 'pg';
import { pool, CREATE_ROOM_QUERY } from './databaseConstants'

export default async function createRoom(name: String) {
  //TODO implement This
  try {
    let result = await pool.query(CREATE_ROOM_QUERY, [name])
    console.log(result);
    return result.rows[1].id
  } catch (e) {
    throw e;
    
    
  }
  

  
}