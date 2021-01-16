import { json, Router } from 'express';
import { BASE_ENDPOINT } from '../../constants/endpoint'
import { default as jwt } from 'jsonwebtoken';
import { createBrotliCompress } from 'zlib';
import createRoom from '../../utils/db/createRoom';
import getSecretKey from '../../utils/auth/secretKey';



// Export module for registering router in express app
export const router: Router = Router();

interface createRoomReqBody{
  name: String;
}

interface responseBody{
  success: Boolean,
  jwt: String,
  errorMessage?: String 
  

}

router.post(BASE_ENDPOINT + '/create-room', (req, res) => {
  try {
    
  
    let output: createRoomReqBody = req.body;
    let payload = {
      name: output.name,
      room: createRoom()
    }

    let payloadOutput = JSON.stringify(payload);

    let token = jwt.sign(payloadOutput, getSecretKey());
    
    let responseBody : responseBody =  {
      success: true,
      jwt: token,
    }


    res.send(JSON.stringify(responseBody));
  }
  catch (e){
    let responseBody : responseBody =  {
      success: false,
      jwt: "none",
      errorMessage: e
    }
    res.status(400);
    res.send(responseBody);
  }
  
})