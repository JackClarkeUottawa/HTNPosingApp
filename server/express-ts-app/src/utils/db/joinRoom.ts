import { Client, Pool } from 'pg';
import { pool} from './databaseConstants'

export default async function joinRoom(name: String, roomKey: number) {
  //TODO implement This
  try {
    let result = await pool.query("");
    
    return result.rows[1].id
  } catch (e) {
    throw e;
    
    
  }
  

  
}