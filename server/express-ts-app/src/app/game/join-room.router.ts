import e, { json, Router } from 'express';
import { BASE_ENDPOINT } from '../../constants/endpoint'
import { default as jwt } from 'jsonwebtoken';
import { createBrotliCompress } from 'zlib';
import createRoom from '../../utils/db/createRoom';
import getSecretKey from '../../utils/auth/secretKey';
import joinRoom from '../../utils/db/joinRoom';



// Export module for registering router in express app
export const router: Router = Router();

interface joinRoomReqBody{
  name: String;
  roomKey: string;
}

interface responseBody{
  success: Boolean,
  jwt: String,
  errorMessage?: String 
  

}

router.put(BASE_ENDPOINT + '/join-room', (req, res) => {
  try {
    
  
    let output: joinRoomReqBody = req.body;
    joinRoom(output.name, parseInt(output.roomKey)).then((output) => {
      let payload = {
        name: output.name,
        room: output
      }
  
      let payloadOutput = JSON.stringify(payload);
  
      let token = jwt.sign(payloadOutput, getSecretKey());
      
      let responseBody: responseBody = {
        success: true,
        jwt: token,
      }
  
  
      res.send(JSON.stringify(responseBody));
      
    }).catch((e) => {
      throw e;
    });

  }
  catch (e) {
    let responseBody: responseBody = {
      success: false,
      jwt: "none",
      errorMessage: e
    }
    res.status(400);
    res.send(responseBody);
  }
  
})