import { json, Router } from 'express';
import { BASE_ENDPOINT } from '../../constants/endpoint'
import { default as jwt } from 'jsonwebtoken';
import { createBrotliCompress } from 'zlib';
import createRoom from '../../utils/db/createRoom';
import getSecretKey from '../../utils/auth/secretKey';
import { headerFormat, PostPicturesReqBody, responseBody } from '../../utils/interfaces/post-api-pictures';
import path from 'path';
import os from 'os';
import fs from 'fs';

import { nanoid } from 'nanoid';

import { jwtPayloadCreateRoom } from '../../utils/interfaces/create-room-interfaces';
import addPathtoDB from '../../utils/db/addPicture';
import { RSA_NO_PADDING } from 'constants';
import { runModel, saveToGCP } from '../../utils/googlecloud/googleCloudFunctions';

import calculateScore from '../../utils/scoreCalculations/calculateScore'


interface responseDecode{
  type: any,
  data: Buffer
}


// Export module for registering router in express app
export const router: Router = Router();





router.post(BASE_ENDPOINT + '/pictures', (req, res) => {
  try {
    let webToken = req.headers.jwt as string;
    let body :jwtPayloadCreateRoom = jwt.verify(webToken, getSecretKey()) as jwtPayloadCreateRoom;
  

  
    let filename = nanoid() +".jpg";
    let output: PostPicturesReqBody = req.body;
    let imagestring = output.imageSTR.split(';base64,').pop();
    if (imagestring == undefined) {
      throw "badimagestring error";
    }
    
    fs.writeFileSync(path.join(os.tmpdir(), filename), imagestring, { encoding:'base64'});
    
    
    saveToGCP(path.join(os.tmpdir(), filename), filename).then( async (gcpath: string) => {
      addPathtoDB(gcpath, body.room)//TODO should also add image id to the result
      fs.unlinkSync(path.join(os.tmpdir(), filename));
      let modelResult = await runModel(gcpath);

      let response: responseBody = {
        success: false,
        score: -1
      }
      response.score = calculateScore(modelResult, modelResult);
      response.success = true;
      res.send(response);

    })
  }
  catch (e) {
    
    let responseBody : responseBody =  {
      success: false,
      score: -1,
      errorMessage: e.toString()
    }
    res.status(400);
    res.send(responseBody);
  }
  
})