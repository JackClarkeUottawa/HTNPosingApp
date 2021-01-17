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
import saveToGCP from '../../utils/googlecloud/googleCloudFunctions';
import { nanoid } from 'nanoid';





// Export module for registering router in express app
export const router: Router = Router();



router.post(BASE_ENDPOINT + '/pictures', (req, res) => {
  try {
    let webToken = req.headers.jwt as string;
    let body = jwt.verify(webToken, getSecretKey());
  

  
    let filename = nanoid();
    let output: PostPicturesReqBody = req.body;
    let buff = new Buffer(output.imageSTR.toString(), 'base64');
    fs.writeFileSync(path.join(os.tmpdir(), filename), buff);
    saveToGCP(path.join(os.tmpdir(), filename), filename).then((gcpath: string) => {
      //addPathtoDB(gcpath, userName)
      fs.unlinkSync(path.join(os.tmpdir(), filename));
    })
    

   



  
  }
  catch (e){
    let responseBody : responseBody =  {
      success: false,
      score: -1,
      errorMessage: e.toString()
    }
    res.status(400);
    res.send(responseBody);
  }
  
})