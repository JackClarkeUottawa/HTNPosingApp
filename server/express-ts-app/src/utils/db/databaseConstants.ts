import { Pool } from 'pg';
import fs from 'fs';
export const pool = new Pool({
  user: 'root',
  host: 'localhost',
  database: 'postgres',
  password: 'password',
  port: 5432,
})

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})


export const CREATE_ROOM_QUERY = fs.readFileSync('src/utils/db/CreateRoom.sql').toString();

export const ADD_PICTURE_QUERY = fs.readFileSync('src/utils/db/AddPicture.sql').toString();