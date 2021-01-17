
export interface createRoomReqBody{
  name: String;
}

export interface responseBody{
  success: Boolean,
  jwt: String,
  errorMessage?: String 
  

}

export interface jwtPayloadCreateRoom{
  name: String,
  room: number,//aka game
  
}