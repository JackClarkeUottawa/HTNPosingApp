
import { Storage } from '@google-cloud/storage';
import axios from 'axios';

const storage = new Storage();

export async function saveToGCP(path: string, filename: string) {
  const bucketName = "imageshtn"
  let response = await storage.bucket(bucketName).upload(path);
  
  console.log(`${path} uploaded to ${bucketName}.`);
  return "gs://imageshtn/" + filename;
  

}

export async function runModel(path: string) {
  let response = await axios.post("https://us-central1-testinglearningproject.cloudfunctions.net/app/get-poses", { image: path });
  return response.data;

}